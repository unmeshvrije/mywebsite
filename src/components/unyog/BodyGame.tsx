"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  RotateCcw,
  RotateCw,
  Undo2,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { bodyGameCopy, type Lang } from "@/lib/unyog";
import type { BodySceneHandle, JointStatus } from "./bodyScene";
import { enableSound, playOk, playOuch } from "./sound";

type Phase = "idle" | "loading" | "ready" | "unsupported";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function BodyGame({ lang }: { lang: Lang }) {
  const t = bodyGameCopy[lang];
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<BodySceneHandle | null>(null);
  const soundRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [status, setStatus] = useState<JointStatus | null>(null);
  const [sound, setSound] = useState(false);

  // Load three.js and build the scene only when the game is near the
  // viewport. Pause rendering while it is scrolled out of view.
  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;
    let disposed = false;
    let visible = false;
    let prev: JointStatus | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sceneRef.current?.setRunning(visible);
        if (!visible || sceneRef.current || disposed) return;
        if (!hasWebGL()) {
          setPhase("unsupported");
          observer.disconnect();
          return;
        }
        setPhase("loading");
        import("./bodyScene")
          .then(({ createBodyScene }) => {
            if (disposed || sceneRef.current) return;
            sceneRef.current = createBodyScene(stage, {
              onStatus(next) {
                if (soundRef.current) {
                  if (!next.ok && (!prev || prev.ok || prev.joint !== next.joint))
                    playOuch();
                  else if (next.ok && prev?.dragging && !next.dragging) playOk();
                }
                prev = next;
                setStatus(next);
              },
              onContextLost() {
                sceneRef.current?.dispose();
                setPhase("unsupported");
              },
            });
            sceneRef.current.setRunning(visible);
            setPhase("ready");
          })
          .catch(() => setPhase("unsupported"));
      },
      { rootMargin: "200px" }
    );
    observer.observe(wrap);

    return () => {
      disposed = true;
      observer.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    const next = !sound;
    if (next) enableSound();
    soundRef.current = next;
    setSound(next);
  };

  const reset = () => {
    sceneRef.current?.reset();
    setStatus(null);
  };

  const buttonClass =
    "inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 border border-ink/15 text-sm text-ink/80 hover:border-clay-600 hover:text-clay-700 focus-visible:outline-2 focus-visible:outline-clay-600 transition-colors disabled:opacity-40";

  return (
    <div ref={wrapRef}>
      <div className="relative rounded-2xl bg-sand-100 border border-ink/10 overflow-hidden">
        {phase === "unsupported" ? (
          <Fallback title={t.fallbackTitle} body={t.fallbackBody} alt={t.fallbackAlt} />
        ) : (
          <>
            <div
              ref={stageRef}
              role="img"
              aria-label={t.canvasLabel}
              className="h-[420px] sm:h-[460px] md:h-[500px] w-full bg-gradient-to-b from-clay-500/15 to-transparent"
            />
            {phase !== "ready" && (
              <p className="absolute inset-0 flex items-center justify-center text-ink/50 text-sm">
                {t.loading}
              </p>
            )}
            <StatusBadge status={status} lang={lang} />
          </>
        )}
      </div>

      {phase !== "unsupported" && (
        <>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button
              type="button"
              onClick={() => sceneRef.current?.turn(-30)}
              className={buttonClass}
              aria-label={t.turnLeft}
              title={t.turnLeft}
              disabled={phase !== "ready"}
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              onClick={() => sceneRef.current?.turn(30)}
              className={buttonClass}
              aria-label={t.turnRight}
              title={t.turnRight}
              disabled={phase !== "ready"}
            >
              <RotateCw size={16} />
            </button>
            <button
              type="button"
              onClick={reset}
              className={buttonClass}
              disabled={phase !== "ready"}
            >
              <Undo2 size={16} />
              {t.reset}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className={`${buttonClass} ml-auto`}
              aria-pressed={sound}
            >
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="sr-only sm:not-sr-only">{sound ? t.soundOn : t.soundOff}</span>
            </button>
          </div>
          <p className="text-ink/60 text-sm mt-3">
            {t.hint} <span className="hidden md:inline">{t.shiftHint}</span>
          </p>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status, lang }: { status: JointStatus | null; lang: Lang }) {
  const t = bodyGameCopy[lang];
  return (
    <div aria-live="polite" className="absolute top-3 left-3 right-3 flex pointer-events-none">
      {status && (
        <span
          key={`${status.joint}-${status.ok}`}
          className={`animate-fade-in inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm ${
            status.ok
              ? "bg-emerald-50/90 text-emerald-800 border-emerald-700/25"
              : "bg-rose-50/90 text-rose-700 border-rose-600/30"
          }`}
        >
          {status.ok ? <Check size={16} /> : <Zap size={16} />}
          {t.joints[status.joint]}:{" "}
          {status.ok ? t.ok : status.reason === "wrongWay" ? t.wrongWay : t.tooFar}
        </span>
      )}
    </div>
  );
}

function Fallback({ title, body, alt }: { title: string; body: string; alt: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 px-6 py-12">
      <svg
        role="img"
        aria-label={alt}
        width="120"
        height="160"
        viewBox="0 0 120 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        className="text-clay-600"
      >
        <circle cx="60" cy="24" r="14" fill="currentColor" stroke="none" />
        <path d="M60 44 V96" />
        <path d="M60 58 L28 22 M60 58 L92 22" />
        <path d="M60 96 L38 148 M60 96 L82 148" />
      </svg>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-ink/70 text-sm max-w-md leading-relaxed">{body}</p>
    </div>
  );
}
