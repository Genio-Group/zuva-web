"use client";

import { format, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import type { RetentionRow } from "@/services/analytics.service";
import { COHORT_RAMP, viz } from "./theme";
import { useContainerWidth } from "./useContainerWidth";

const OFFSETS = [0, 1, 3, 7, 14, 30];
const PLOT_H = 220;
const MARGIN = { top: 14, right: 24, bottom: 30, left: 40 };
const MAX_COHORTS = COHORT_RAMP.length; // 6 — the validated ordinal ramp depth

interface Cohort {
  week: string;
  label: string;
  size: number;
  color: string;
  // retention % by offset index; undefined where the cohort hasn't aged yet
  values: (number | undefined)[];
}

export function buildCohorts(rows: RetentionRow[]): Cohort[] {
  const byWeek = new Map<string, RetentionRow[]>();
  for (const row of rows) {
    const list = byWeek.get(row.cohort_week) ?? [];
    list.push(row);
    byWeek.set(row.cohort_week, list);
  }

  const weeks = [...byWeek.keys()].sort().reverse().slice(0, MAX_COHORTS);

  // Newest cohort wears the brightest gold; older cohorts step down the ramp.
  return weeks.map((week, i) => {
    const list = byWeek.get(week) ?? [];
    const size = list[0]?.cohort_size ?? 0;
    const values = OFFSETS.map((offset) => {
      const row = list.find((r) => r.day_offset === offset);
      if (!row || row.cohort_size === 0) return undefined;
      return (row.retained / row.cohort_size) * 100;
    });
    return {
      week,
      label: format(parseISO(week), "MMM d"),
      size,
      color: COHORT_RAMP[i],
      values,
    };
  });
}

// Rolling retention curves: X = day offset at fixed ordinal positions
// (0,1,3,7,14,30 evenly spaced — a linear scale would crush the early drop),
// Y = % of the cohort still active on/after that day. One line per cohort week.
export function RetentionChart({
  rows,
  ariaLabel,
}: {
  rows: RetentionRow[];
  ariaLabel: string;
}) {
  const { ref, width } = useContainerWidth<HTMLDivElement>();
  const [activeOffset, setActiveOffset] = useState<number | null>(null);

  const cohorts = useMemo(() => buildCohorts(rows), [rows]);

  const height = MARGIN.top + PLOT_H + MARGIN.bottom;
  const innerW = Math.max(0, width - MARGIN.left - MARGIN.right);
  const xAt = (i: number) =>
    MARGIN.left +
    (OFFSETS.length > 1 ? (i / (OFFSETS.length - 1)) * innerW : 0);
  const yAt = (pct: number) => MARGIN.top + PLOT_H - (pct / 100) * PLOT_H;

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    OFFSETS.forEach((_, i) => {
      const dist = Math.abs(xAt(i) - px);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveOffset(best);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    setActiveOffset((cur) => {
      if (cur === null) return delta > 0 ? 0 : OFFSETS.length - 1;
      return Math.max(0, Math.min(OFFSETS.length - 1, cur + delta));
    });
  };

  // Draw oldest → newest so the brightest, most recent line sits on top.
  const drawOrder = [...cohorts].reverse();
  const newest = cohorts[0];
  const newestLastIdx = newest
    ? newest.values.reduce<number>(
        (acc, v, i) => (v !== undefined ? i : acc),
        -1,
      )
    : -1;

  const tooltipRows =
    activeOffset !== null
      ? cohorts
          .map((c) => ({ cohort: c, pct: c.values[activeOffset] }))
          .filter(
            (r): r is { cohort: Cohort; pct: number } => r.pct !== undefined,
          )
      : [];

  return (
    <div className="flex flex-col gap-3">
      {/* legend — the dependable identity channel for multiple series */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {cohorts.map((c) => (
          <span key={c.week} className="flex items-center gap-1.5 text-[11px]">
            <svg width={16} height={4} aria-hidden="true" role="presentation">
              <line
                x1={0}
                x2={16}
                y1={2}
                y2={2}
                stroke={c.color}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
            <span style={{ color: viz.textSecondary }}>
              {c.label}
              <span style={{ color: viz.textMuted }}> · {c.size} users</span>
            </span>
          </span>
        ))}
      </div>

      <div ref={ref} className="relative w-full select-none">
        {width > 0 && (
          <svg
            width={width}
            height={height}
            role="img"
            aria-label={ariaLabel}
            // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard focus + arrow keys move the crosshair (same readout as hover)
            tabIndex={0}
            className="block outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
            onPointerMove={handlePointer}
            onPointerLeave={() => setActiveOffset(null)}
            onBlur={() => setActiveOffset(null)}
            onKeyDown={handleKey}
          >
            {/* horizontal gridlines + y ticks */}
            {[0, 25, 50, 75, 100].map((pct) => (
              <g key={pct}>
                <line
                  x1={MARGIN.left}
                  x2={MARGIN.left + innerW}
                  y1={yAt(pct)}
                  y2={yAt(pct)}
                  stroke={pct === 0 ? viz.baseline : viz.grid}
                  strokeWidth={1}
                />
                <text
                  x={MARGIN.left - 8}
                  y={yAt(pct) + 3}
                  textAnchor="end"
                  fontSize={10}
                  fill={viz.textMuted}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {pct}%
                </text>
              </g>
            ))}

            {/* x ticks */}
            {OFFSETS.map((offset, i) => (
              <text
                key={offset}
                x={xAt(i)}
                y={MARGIN.top + PLOT_H + 18}
                textAnchor="middle"
                fontSize={10}
                fill={viz.textMuted}
              >
                D{offset}
              </text>
            ))}

            {/* crosshair */}
            {activeOffset !== null && (
              <line
                x1={xAt(activeOffset)}
                x2={xAt(activeOffset)}
                y1={MARGIN.top}
                y2={MARGIN.top + PLOT_H}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth={1}
              />
            )}

            {/* cohort lines */}
            {drawOrder.map((c) => {
              const pts = c.values
                .map((v, i) => (v === undefined ? null : `${xAt(i)},${yAt(v)}`))
                .filter((p): p is string => p !== null);
              return (
                <g key={c.week}>
                  {pts.length > 1 && (
                    <polyline
                      points={pts.join(" ")}
                      fill="none"
                      stroke={c.color}
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  )}
                  {c.values.map((v, i) =>
                    v === undefined ? null : (
                      <circle
                        key={OFFSETS[i]}
                        cx={xAt(i)}
                        cy={yAt(v)}
                        r={4}
                        fill={c.color}
                        stroke={viz.surface}
                        strokeWidth={2}
                      />
                    ),
                  )}
                </g>
              );
            })}

            {/* selective direct label: the newest cohort's latest point */}
            {newest && newestLastIdx >= 0 && (
              <text
                x={xAt(newestLastIdx) + 8}
                y={yAt(newest.values[newestLastIdx] ?? 0) + 3}
                fontSize={10}
                fontWeight={600}
                fill={viz.textSecondary}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {Math.round(newest.values[newestLastIdx] ?? 0)}%
              </text>
            )}
          </svg>
        )}

        {/* one tooltip, every series at the hovered offset */}
        {activeOffset !== null && tooltipRows.length > 0 && width > 0 && (
          <div
            className="absolute z-10 pointer-events-none rounded-lg px-3 py-2 text-xs shadow-lg"
            style={{
              left: Math.min(Math.max(xAt(activeOffset), 90), width - 90),
              top: MARGIN.top,
              transform: "translateX(-50%)",
              backgroundColor: "#222222",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div className="mb-1 font-medium" style={{ color: viz.textMuted }}>
              Day {OFFSETS[activeOffset]}
            </div>
            {tooltipRows.map(({ cohort, pct }) => (
              <div
                key={cohort.week}
                className="flex items-center gap-1.5 whitespace-nowrap leading-5"
              >
                <svg
                  width={12}
                  height={4}
                  aria-hidden="true"
                  role="presentation"
                >
                  <line
                    x1={0}
                    x2={12}
                    y1={2}
                    y2={2}
                    stroke={cohort.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className="font-semibold"
                  style={{
                    color: viz.text,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {pct.toFixed(0)}%
                </span>
                <span style={{ color: viz.textMuted }}>{cohort.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
