// Dark chart theme matching the mobile app (see analytics_dashboard.md §5).
export const viz = {
  page: "#0A0A0A",
  surface: "#161616",
  border: "rgba(255,255,255,0.06)",
  grid: "rgba(255,255,255,0.06)",
  baseline: "rgba(255,255,255,0.16)",
  text: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.65)",
  textMuted: "rgba(255,255,255,0.45)",
  gold: "#FFDD00",
  goldDim: "#FFC107",
} as const;

// Ordinal ramp for retention cohort lines, newest → oldest.
// Validated (dataviz six-checks, ordinal mode) against surface #161616:
// monotone lightness, adjacent ΔL ≥ 0.06, dim end ≥ 2:1 contrast.
export const COHORT_RAMP = [
  "#ffdd00",
  "#e2bf00",
  "#c5a200",
  "#a98600",
  "#8d6a00",
  "#6b4c00",
] as const;

// Sequential grey→gold ramp for the referral "active ratio" encoding.
// Endpoints validated against #161616 (dim end #6e6e66 sits at 3.5:1).
const RAMP_LO = [0x6e, 0x6e, 0x66];
const RAMP_HI = [0xff, 0xdd, 0x00];

export function activeRatioColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const c = RAMP_LO.map((lo, i) =>
    Math.round(lo + (RAMP_HI[i] - lo) * clamped),
  );
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

// Deterministic 0..1 hash for stable jitter (no Math.random → no re-render drift).
export function hash01(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

export function quantile(sortedValues: number[], q: number): number {
  if (sortedValues.length === 0) return 0;
  const pos = (sortedValues.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  const next = sortedValues[base + 1];
  return next !== undefined
    ? sortedValues[base] + rest * (next - sortedValues[base])
    : sortedValues[base];
}

// Clean tick values for a 0..max axis (1/2/5 × 10^k steps, ≤ ~7 ticks).
export function niceTicks(max: number): number[] {
  if (max <= 0) return [0, 1];
  const rough = max / 6;
  const pow = 10 ** Math.floor(Math.log10(rough));
  const step =
    [1, 2, 5, 10].map((m) => m * pow).find((s) => max / s <= 6) ?? 10 * pow;
  const ticks: number[] = [];
  for (let v = 0; v <= max + 1e-9; v += step)
    ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 10000) return `${(n / 1000).toFixed(1)}K`;
  return n % 1 === 0 ? n.toLocaleString("en-US") : n.toFixed(1);
}
