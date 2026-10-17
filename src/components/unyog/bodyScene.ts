// The UnYog Body Game scene: a cartoon figure built from primitives that the
// visitor can pose by dragging. Loaded lazily by BodyGame.tsx, so three.js
// never blocks first paint.
//
// Joint rules live in jointRanges.ts. This file only measures angles and
// compares them against those numbers.

import {
  BoxGeometry,
  CapsuleGeometry,
  CircleGeometry,
  Color,
  DirectionalLight,
  Euler,
  Group,
  HemisphereLight,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshToonMaterial,
  type Object3D,
  PerspectiveCamera,
  Plane,
  Quaternion,
  Raycaster,
  Scene,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { JOINT_RANGES, type JointId } from "./jointRanges";

export type JointStatus = {
  joint: JointId;
  ok: boolean;
  reason?: "wrongWay" | "tooFar";
  dragging: boolean;
};

export type BodySceneHandle = {
  reset(): void;
  turn(degrees: number): void;
  setRunning(running: boolean): void;
  dispose(): void;
};

type Callbacks = {
  onStatus(status: JointStatus): void;
  onContextLost(): void;
};

type NeckPose = { turn: number; nod: number; tilt: number };

type Joint = {
  id: JointId;
  group: Group;
  marker: Mesh<SphereGeometry, MeshBasicMaterial>;
  // Ball joints: +1 for the figure's left side (+X), -1 for its right.
  side: 1 | -1;
  // Hinge joints: sign of rotation.x that counts as natural flexion.
  flexSign: 1 | -1;
  rest: Quaternion;
};

type Drag =
  | { kind: "turn"; lastX: number }
  | {
      kind: "ball";
      joint: Joint;
      plane: Plane;
      startDir: Vector3;
      startQuat: Quaternion;
    }
  | {
      kind: "hinge";
      joint: Joint;
      lastAngle: number;
      angle: number;
    }
  | { kind: "neck"; joint: Joint; lastX: number; lastY: number; tilt: boolean };

type Spring = {
  joint: Joint;
  from: Quaternion;
  to: Quaternion;
  start: number;
};

const DEG = Math.PI / 180;
const DOWN = new Vector3(0, -1, 0);
const X_AXIS = new Vector3(1, 0, 0);
const DEFAULT_TURN = -0.55;
const SPRING_MS = 280;

const COLORS = {
  body: "#d98a5f",
  torso: "#b85c36",
  ends: "#f1d9c4",
  face: "#2d231c",
  joint: "#fbf7f1",
  ok: "#3f9a5f",
  ouch: "#e11d48",
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

// --- Joint evaluation -------------------------------------------------------

type BallRange = {
  forward: number;
  outward: number;
  backward: number;
  inward: number;
};

// Allowed swing (degrees from hanging down) for a direction around the body.
// azimuth: 0 = outward, 90 = forward, +-180 = inward, -90 = backward.
function ballLimit(r: BallRange, azimuth: number) {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  if (azimuth >= 0 && azimuth <= 90) return lerp(r.outward, r.forward, azimuth / 90);
  if (azimuth > 90) return lerp(r.forward, r.inward, (azimuth - 90) / 90);
  if (azimuth >= -90) return lerp(r.backward, r.outward, (azimuth + 90) / 90);
  return lerp(r.inward, r.backward, (azimuth + 180) / 90);
}

type Verdict = { ok: boolean; reason?: "wrongWay" | "tooFar"; fix: Quaternion };

function judgeBall(j: Joint, range: BallRange): Verdict {
  // Direction the limb points, in the parent's frame.
  const d = DOWN.clone().applyQuaternion(j.group.quaternion);
  const swing = Math.acos(clamp(-d.y, -1, 1)) / DEG;
  const azimuth = Math.atan2(d.z, d.x * j.side) / DEG;
  const limit = ballLimit(range, azimuth);
  // Tiny swings have no meaningful direction, so they are always fine.
  if (swing <= limit || swing < 15) return { ok: true, fix: j.group.quaternion.clone() };

  // Pull the limb back along the same direction until it is just in range.
  const s = (limit - 3) * DEG;
  const a = azimuth * DEG;
  const target = new Vector3(
    Math.sin(s) * Math.cos(a) * j.side,
    -Math.cos(s),
    Math.sin(s) * Math.sin(a)
  );
  const fix = new Quaternion()
    .setFromUnitVectors(d, target)
    .multiply(j.group.quaternion);
  return { ok: false, reason: "tooFar", fix };
}

function judgeHinge(j: Joint, range: { flex: number; hyperextend: number }): Verdict {
  const flex = (j.group.rotation.x / DEG) * j.flexSign;
  const hingeQuat = (deg: number) =>
    new Quaternion().setFromAxisAngle(X_AXIS, deg * DEG * j.flexSign);
  if (flex < -range.hyperextend) return { ok: false, reason: "wrongWay", fix: hingeQuat(0) };
  if (flex > range.flex) return { ok: false, reason: "tooFar", fix: hingeQuat(range.flex - 3) };
  return { ok: true, fix: j.group.quaternion.clone() };
}

const NECK = JOINT_RANGES.neck;

function clampNeck(p: NeckPose): NeckPose {
  return {
    turn: clamp(p.turn, -NECK.turn, NECK.turn),
    nod: clamp(p.nod, -NECK.nodBack, NECK.nodForward),
    tilt: clamp(p.tilt, -NECK.sideTilt, NECK.sideTilt),
  };
}

function neckQuat(p: NeckPose) {
  return new Quaternion().setFromEuler(
    new Euler(p.nod * DEG, p.turn * DEG, -p.tilt * DEG, "YXZ")
  );
}

// --- Scene ------------------------------------------------------------------

export function createBodyScene(
  container: HTMLElement,
  callbacks: Callbacks
): BodySceneHandle {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.touchAction = "none";
  canvas.style.cursor = "grab";
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 50);
  const lookY = 1.1;

  scene.add(new HemisphereLight("#ffffff", "#c9b49a", 1.6));
  const sun = new DirectionalLight("#ffffff", 1.6);
  sun.position.set(2, 4, 3);
  scene.add(sun);

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Materials
  const toon = (c: string) => new MeshToonMaterial({ color: c });
  const bodyMat = toon(COLORS.body);
  const torsoMat = toon(COLORS.torso);
  const endsMat = toon(COLORS.ends);
  const faceMat = new MeshBasicMaterial({ color: COLORS.face });

  const pickables: Mesh[] = [];
  const owner = new Map<Object3D, Joint | "turn">();
  const add = (
    parent: Object3D,
    mesh: Mesh,
    pos: [number, number, number],
    who: Joint | "turn" | null
  ) => {
    mesh.position.set(...pos);
    parent.add(mesh);
    if (who) {
      pickables.push(mesh);
      owner.set(mesh, who);
    }
    return mesh;
  };

  const root = new Group();
  root.rotation.y = DEFAULT_TURN;
  scene.add(root);

  // Soft shadow under the feet.
  const shadow = new Mesh(
    new CircleGeometry(0.45, 32),
    new MeshBasicMaterial({ color: "#5a3a24", transparent: true, opacity: 0.15 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.001;
  root.add(shadow);

  const pelvis = new Group();
  pelvis.position.y = 0.92;
  root.add(pelvis);

  const hipsMesh = new Mesh(new CapsuleGeometry(0.12, 0.14, 4, 12), torsoMat);
  hipsMesh.rotation.z = Math.PI / 2;
  add(pelvis, hipsMesh, [0, 0, 0], "turn");
  const chest = add(
    pelvis,
    new Mesh(new CapsuleGeometry(0.17, 0.3, 6, 16), torsoMat),
    [0, 0.3, 0],
    "turn"
  );
  const shoulderBar = new Mesh(new CapsuleGeometry(0.08, 0.36, 4, 12), torsoMat);
  shoulderBar.rotation.z = Math.PI / 2;
  add(pelvis, shoulderBar, [0, 0.47, 0], "turn");

  const joints: Joint[] = [];
  const makeJoint = (
    id: JointId,
    parent: Object3D,
    pos: [number, number, number],
    markerRadius: number,
    side: 1 | -1 = 1,
    flexSign: 1 | -1 = 1
  ) => {
    const group = new Group();
    group.position.set(...pos);
    parent.add(group);
    const marker = new Mesh(
      new SphereGeometry(markerRadius, 16, 12),
      new MeshBasicMaterial({ color: COLORS.joint })
    );
    group.add(marker);
    const joint: Joint = { id, group, marker, side, flexSign, rest: new Quaternion() };
    pickables.push(marker);
    owner.set(marker, joint);
    joints.push(joint);
    return joint;
  };

  // Neck and head
  const neck = makeJoint("neck", pelvis, [0, 0.6, 0], 0.06);
  neck.group.rotation.order = "YXZ";
  add(neck.group, new Mesh(new CapsuleGeometry(0.05, 0.06, 4, 8), bodyMat), [0, 0.05, 0], neck);
  const head = new Group();
  head.position.y = 0.19;
  neck.group.add(head);
  add(head, new Mesh(new SphereGeometry(0.14, 24, 18), bodyMat), [0, 0, 0], neck);
  add(head, new Mesh(new SphereGeometry(0.05, 12, 10), torsoMat), [0, 0.14, -0.04], neck);
  const eyes = [-1, 1].map((s) =>
    add(head, new Mesh(new SphereGeometry(0.022, 10, 8), faceMat), [s * 0.05, 0.025, 0.125], neck)
  );
  const mouth = add(
    head,
    new Mesh(new TorusGeometry(0.045, 0.011, 6, 16, Math.PI), faceMat),
    [0, -0.035, 0.13],
    neck
  );
  mouth.rotation.z = Math.PI;

  // Arms and legs, built once per side.
  for (const side of [1, -1] as const) {
    const shoulder = makeJoint("shoulder", pelvis, [side * 0.25, 0.47, 0], 0.07, side);
    add(shoulder.group, new Mesh(new CapsuleGeometry(0.055, 0.2, 4, 10), bodyMat), [0, -0.15, 0], shoulder);
    const elbow = makeJoint("elbow", shoulder.group, [0, -0.3, 0], 0.062, side, -1);
    add(elbow.group, new Mesh(new CapsuleGeometry(0.05, 0.18, 4, 10), bodyMat), [0, -0.14, 0], elbow);
    add(elbow.group, new Mesh(new SphereGeometry(0.065, 14, 10), endsMat), [0, -0.3, 0], elbow);

    const hip = makeJoint("hip", pelvis, [side * 0.1, -0.03, 0], 0.088, side);
    add(hip.group, new Mesh(new CapsuleGeometry(0.08, 0.26, 4, 10), bodyMat), [0, -0.21, 0], hip);
    const knee = makeJoint("knee", hip.group, [0, -0.43, 0], 0.075, side, 1);
    add(knee.group, new Mesh(new CapsuleGeometry(0.065, 0.26, 4, 10), bodyMat), [0, -0.2, 0], knee);
    add(knee.group, new Mesh(new BoxGeometry(0.11, 0.06, 0.24), endsMat), [0, -0.43, 0.05], knee);

    // Relaxed rest pose: arms a little away from the body, elbows soft.
    shoulder.rest.setFromUnitVectors(
      DOWN,
      new Vector3(side * Math.sin(8 * DEG), -Math.cos(8 * DEG), 0)
    );
    elbow.rest.setFromAxisAngle(X_AXIS, 10 * DEG * elbow.flexSign);
  }
  for (const j of joints) j.group.quaternion.copy(j.rest);

  let neckPose: NeckPose = { turn: 0, nod: 0, tilt: 0 };

  // --- State --------------------------------------------------------------

  let drag: Drag | null = null;
  let active: Joint | null = null;
  let status: JointStatus | null = null;
  let ouchSince = -1;
  let calmUntil = 0;
  let wobbleStart = -1;
  let rootTarget = DEFAULT_TURN;
  const springs: Spring[] = [];

  const judge = (j: Joint): Verdict => {
    const r = JOINT_RANGES[j.id];
    if (r.kind === "ball") return judgeBall(j, r);
    if (r.kind === "hinge") return judgeHinge(j, r);
    const fixed = clampNeck(neckPose);
    const ok =
      fixed.turn === neckPose.turn &&
      fixed.nod === neckPose.nod &&
      fixed.tilt === neckPose.tilt;
    return { ok, reason: ok ? undefined : "tooFar", fix: neckQuat(fixed) };
  };

  const report = (next: JointStatus) => {
    if (
      status &&
      status.joint === next.joint &&
      status.ok === next.ok &&
      status.reason === next.reason &&
      status.dragging === next.dragging
    )
      return;
    const now = performance.now();
    if (!next.ok && (!status || status.ok || status.joint !== next.joint)) {
      ouchSince = now;
      wobbleStart = now;
    }
    if (next.ok) ouchSince = -1;
    status = next;
    callbacks.onStatus(next);
  };

  // --- Pointer handling ---------------------------------------------------

  const raycaster = new Raycaster();
  const ndc = new Vector2();
  const tmpQ = new Quaternion();
  const tmpV = new Vector3();

  const setRay = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    ndc.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(ndc, camera);
  };

  const pick = (e: PointerEvent) => {
    setRay(e);
    const hit = raycaster.intersectObjects(pickables, false)[0];
    return hit ? { who: owner.get(hit.object)!, point: hit.point } : null;
  };

  // Direction from a joint to a world point, in the joint's parent frame.
  const toParentFrame = (j: Joint, worldVec: Vector3) =>
    worldVec.applyQuaternion(j.group.parent!.getWorldQuaternion(tmpQ).invert());

  // Where the pointer lands on the hinge's plane of motion, as an angle.
  const hingeAngle = (j: Joint): number | null => {
    const pivot = j.group.getWorldPosition(new Vector3());
    const axis = X_AXIS.clone().applyQuaternion(
      j.group.parent!.getWorldQuaternion(tmpQ)
    );
    const ray = raycaster.ray;
    const hit = new Vector3();
    if (Math.abs(ray.direction.dot(axis)) > 0.15) {
      if (!ray.intersectPlane(new Plane().setFromNormalAndCoplanarPoint(axis, pivot), hit))
        return null;
    } else {
      // Looking at the hinge edge-on: use a camera-facing plane, then
      // flatten the point onto the hinge plane.
      const facing = camera.getWorldDirection(tmpV).clone();
      if (!ray.intersectPlane(new Plane().setFromNormalAndCoplanarPoint(facing, pivot), hit))
        return null;
      hit.sub(axis.clone().multiplyScalar(hit.clone().sub(pivot).dot(axis)));
    }
    const v = toParentFrame(j, hit.sub(pivot));
    if (Math.hypot(v.y, v.z) < 0.02) return null;
    return Math.atan2(-v.z, -v.y);
  };

  const onDown = (e: PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const target = pick(e);
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";

    if (!target || target.who === "turn") {
      drag = { kind: "turn", lastX: e.clientX };
      return;
    }
    const joint = target.who;
    // Grabbing a joint cancels any spring still moving it.
    for (let i = springs.length - 1; i >= 0; i--)
      if (springs[i].joint === joint) springs.splice(i, 1);
    active = joint;
    calmUntil = 0;

    const kind = JOINT_RANGES[joint.id].kind;
    if (kind === "ball") {
      const pivot = joint.group.getWorldPosition(new Vector3());
      const plane = new Plane().setFromNormalAndCoplanarPoint(
        camera.getWorldDirection(new Vector3()),
        target.point
      );
      drag = {
        kind: "ball",
        joint,
        plane,
        startDir: toParentFrame(joint, target.point.clone().sub(pivot)).normalize(),
        startQuat: joint.group.quaternion.clone(),
      };
    } else if (kind === "hinge") {
      const a = hingeAngle(joint) ?? 0;
      drag = { kind: "hinge", joint, lastAngle: a, angle: joint.group.rotation.x };
    } else {
      drag = { kind: "neck", joint, lastX: e.clientX, lastY: e.clientY, tilt: e.shiftKey };
    }
    const v = judge(joint);
    report({ joint: joint.id, ok: v.ok, reason: v.reason, dragging: true });
  };

  const onMove = (e: PointerEvent) => {
    if (!drag) {
      if (e.pointerType === "mouse") {
        const target = pick(e);
        canvas.style.cursor = target && target.who !== "turn" ? "pointer" : "grab";
      }
      return;
    }
    setRay(e);

    if (drag.kind === "turn") {
      rootTarget += (e.clientX - drag.lastX) * 0.01;
      root.rotation.y = rootTarget;
      drag.lastX = e.clientX;
      return;
    }

    const j = drag.joint;
    if (drag.kind === "ball") {
      const hit = raycaster.ray.intersectPlane(drag.plane, new Vector3());
      if (!hit) return;
      const pivot = j.group.getWorldPosition(new Vector3());
      const dir = toParentFrame(j, hit.sub(pivot));
      if (dir.lengthSq() < 0.0004) return;
      dir.normalize();
      j.group.quaternion
        .setFromUnitVectors(drag.startDir, dir)
        .multiply(drag.startQuat);
    } else if (drag.kind === "hinge") {
      const a = hingeAngle(j);
      if (a === null) return;
      drag.angle += wrapAngle(a - drag.lastAngle);
      drag.lastAngle = a;
      const r = JOINT_RANGES[j.id as "elbow" | "knee"];
      // Let it go past the limits so it can say ouch, but not spin round.
      const flex = clamp(drag.angle * j.flexSign, -(r.hyperextend + 45) * DEG, (r.flex + 30) * DEG);
      j.group.rotation.x = drag.angle = flex * j.flexSign;
    } else {
      const dx = e.clientX - drag.lastX;
      const dy = e.clientY - drag.lastY;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      // When the figure faces away, screen left and right are swapped.
      const facing = Math.cos(root.rotation.y) >= 0 ? 1 : -1;
      const k = 0.5;
      neckPose = {
        turn: clamp(neckPose.turn + (drag.tilt ? 0 : dx * k * facing), -NECK.turn * 1.6, NECK.turn * 1.6),
        nod: clamp(neckPose.nod + (drag.tilt ? 0 : dy * k), -NECK.nodBack * 1.6, NECK.nodForward * 1.6),
        tilt: clamp(neckPose.tilt + (drag.tilt ? dx * k * facing : 0), -NECK.sideTilt * 1.6, NECK.sideTilt * 1.6),
      };
      j.group.quaternion.copy(neckQuat(neckPose));
    }

    const v = judge(j);
    report({ joint: j.id, ok: v.ok, reason: v.reason, dragging: true });
  };

  const onUp = (e: PointerEvent) => {
    if (!drag) return;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    canvas.style.cursor = "grab";
    if (drag.kind !== "turn") {
      const j = drag.joint;
      const v = judge(j);
      if (!v.ok) {
        // Be forgiving: ease back into the nearest comfortable pose.
        springs.push({
          joint: j,
          from: j.group.quaternion.clone(),
          to: v.fix,
          start: performance.now(),
        });
        if (j.id === "neck") neckPose = clampNeck(neckPose);
      }
      calmUntil = performance.now() + 900;
      report({ joint: j.id, ok: v.ok, reason: v.reason, dragging: false });
    }
    drag = null;
  };

  const onContextLost = (e: Event) => {
    e.preventDefault();
    callbacks.onContextLost();
  };

  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);
  canvas.addEventListener("webglcontextlost", onContextLost);

  // --- Layout -------------------------------------------------------------

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Step back on narrow screens so raised arms still fit.
    const dist = 4.1 * Math.max(1, 0.75 / camera.aspect);
    camera.position.set(0, lookY + 0.2, dist);
    camera.lookAt(0, lookY, 0);
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  // --- Animation ----------------------------------------------------------

  const ok = new Color(COLORS.ok);
  const ouch = new Color(COLORS.ouch);
  const neutral = new Color(COLORS.joint);

  const update = (now: number) => {
    for (let i = springs.length - 1; i >= 0; i--) {
      const s = springs[i];
      const t = Math.min(1, (now - s.start) / SPRING_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      s.joint.group.quaternion.slerpQuaternions(s.from, s.to, eased);
      if (t === 1) {
        springs.splice(i, 1);
        // Back in range: tell the UI the joint is happy again.
        if (s.joint === active && status && !status.ok && !drag)
          report({ joint: s.joint.id, ok: true, dragging: false });
      }
    }

    if (!drag) root.rotation.y += (rootTarget - root.rotation.y) * 0.15;

    const hurting = status !== null && !status.ok;
    for (const j of joints) {
      let color = neutral;
      let scale = 1;
      if (j === active && (drag || now < calmUntil)) {
        color = hurting ? ouch : ok;
        if (hurting && !reducedMotion) scale = 1.25 + 0.15 * Math.sin(now / 50);
      }
      j.marker.material.color.copy(color);
      j.marker.scale.setScalar(scale);
    }

    // The wince: squinting eyes, a frown, and a quick head shake.
    const wincing = ouchSince >= 0 || (hurting && now < calmUntil);
    for (const eye of eyes) eye.scale.y = wincing ? 0.2 : 1;
    mouth.rotation.z = wincing ? 0 : Math.PI;
    const sinceWobble = now - wobbleStart;
    head.rotation.z =
      wobbleStart >= 0 && sinceWobble < 450 && !reducedMotion
        ? 0.12 * Math.sin(sinceWobble / 25) * (1 - sinceWobble / 450)
        : 0;
    if (!drag && status && !status.ok && now >= calmUntil) ouchSince = -1;

    if (!reducedMotion) chest.scale.set(1, 1 + 0.015 * Math.sin(now / 700), 1);
  };

  let running = false;
  let raf = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    update(now);
    renderer.render(scene, camera);
  };

  resize();

  return {
    reset() {
      const now = performance.now();
      springs.length = 0;
      for (const j of joints)
        springs.push({
          joint: j,
          from: j.group.quaternion.clone(),
          to: j.rest.clone(),
          start: now,
        });
      neckPose = { turn: 0, nod: 0, tilt: 0 };
      rootTarget = DEFAULT_TURN;
      active = null;
      ouchSince = -1;
    },
    turn(degrees: number) {
      rootTarget += degrees * DEG;
    },
    setRunning(next: boolean) {
      if (next === running) return;
      running = next;
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    },
    dispose() {
      cancelAnimationFrame(raf);
      running = false;
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      const materials = new Set<Material>();
      scene.traverse((o) => {
        if (o instanceof Mesh) {
          o.geometry.dispose();
          materials.add(o.material as Material);
        }
      });
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      canvas.remove();
    },
  };
}
