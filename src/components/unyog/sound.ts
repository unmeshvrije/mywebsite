// Tiny sound effects for the Body Game, synthesised with the Web Audio API.
// No audio files and no external services. Nothing plays until the visitor
// turns sound on, which also creates the AudioContext inside that click.

let ctx: AudioContext | null = null;

export function enableSound() {
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
}

function tone(
  type: OscillatorType,
  from: number,
  to: number,
  start: number,
  duration: number,
  volume: number
) {
  if (!ctx) return;
  const t = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  osc.frequency.exponentialRampToValueAtTime(to, t + duration);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(volume, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

// A soft two-note chime.
export function playOk() {
  tone("sine", 660, 660, 0, 0.18, 0.08);
  tone("sine", 990, 990, 0.09, 0.25, 0.06);
}

// A short, cartoonish "boing" that drops in pitch.
export function playOuch() {
  tone("triangle", 520, 140, 0, 0.32, 0.12);
}
