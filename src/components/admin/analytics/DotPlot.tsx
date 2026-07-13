"use client";

import { useMemo, useState } from "react";
import {
  activeRatioColor,
  formatNumber,
  hash01,
  niceTicks,
  quantile,
  viz,
} from "./theme";
import { useContainerWidth } from "./useContainerWidth";

export interface DotPlotPoint {
  id: string; // stable seed for jitter (user id, user-day key…)
  value: number;
  ratio?: number; // 0..1 → grey→gold ramp (referrals); omit for plain gold
  tooltip: { value: string; label: string }[];
}

interface DotPlotProps {
  points: DotPlotPoint[];
  xLabel: string;
  xMax?: number; // force the axis end (e.g. the ads daily cap)
  referenceLine?: { x: number; label: string };
  showMedian?: boolean;
  useRatioColor?: boolean;
  ariaLabel: string;
}

const PLOT_H = 150;
const MARGIN = { top: 22, right: 20, bottom: 34, left: 12 };
const DOT_R = 4;

// Strip/jitter plot: one translucent dot per entity along a value axis, so
// density reads as darkness. Hover uses nearest-point hit testing (the whole
// plot is the target, never the 8px dot); arrow keys walk the sorted points.
export function DotPlot({
  points,
  xLabel,
  xMax,
  referenceLine,
  showMedian,
  useRatioColor,
  ariaLabel,
}: DotPlotProps) {
  const { ref, width } = useContainerWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);

  const height = MARGIN.top + PLOT_H + MARGIN.bottom;
  const innerW = Math.max(0, width - MARGIN.left - MARGIN.right);

  const { dots, ticks, median, scale } = useMemo(() => {
    const values = points.map((p) => p.value);
    const dataMax = values.length ? Math.max(...values) : 0;
    const axisMax = Math.max(dataMax, xMax ?? 0, referenceLine?.x ?? 0, 1);
    const tickVals = niceTicks(axisMax);
    const end = Math.max(axisMax, tickVals[tickVals.length - 1]);
    const x = (v: number) => MARGIN.left + (v / end) * innerW;

    const sorted = [...values].sort((a, b) => a - b);
    const med = quantile(sorted, 0.5);

    const placed = points
      .map((p, i) => ({
        ...p,
        index: i,
        cx: x(p.value),
        cy: MARGIN.top + 10 + hash01(p.id) * (PLOT_H - 20),
      }))
      .sort((a, b) => a.value - b.value);

    return { dots: placed, ticks: tickVals, median: med, scale: x };
  }, [points, xMax, referenceLine, innerW]);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    let best = -1;
    let bestDist = Number.POSITIVE_INFINITY;
    dots.forEach((d, i) => {
      const dist = (d.cx - px) ** 2 + (d.cy - py) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best >= 0 ? best : null);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    setActive((cur) => {
      if (dots.length === 0) return null;
      if (cur === null) return delta > 0 ? 0 : dots.length - 1;
      return Math.max(0, Math.min(dots.length - 1, cur + delta));
    });
  };

  const activeDot = active !== null ? dots[active] : null;

  return (
    <div ref={ref} className="relative w-full select-none">
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={ariaLabel}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard focus + arrow keys walk the points (same readout as hover)
          tabIndex={0}
          className="block outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
          onPointerMove={handlePointer}
          onPointerLeave={() => setActive(null)}
          onBlur={() => setActive(null)}
          onKeyDown={handleKey}
        >
          {/* gridlines + ticks */}
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={scale(t)}
                x2={scale(t)}
                y1={MARGIN.top}
                y2={MARGIN.top + PLOT_H}
                stroke={viz.grid}
                strokeWidth={1}
              />
              <text
                x={scale(t)}
                y={MARGIN.top + PLOT_H + 16}
                textAnchor="middle"
                fontSize={10}
                fill={viz.textMuted}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatNumber(t)}
              </text>
            </g>
          ))}

          {/* baseline */}
          <line
            x1={MARGIN.left}
            x2={MARGIN.left + innerW}
            y1={MARGIN.top + PLOT_H}
            y2={MARGIN.top + PLOT_H}
            stroke={viz.baseline}
            strokeWidth={1}
          />

          {/* axis caption */}
          <text
            x={MARGIN.left + innerW / 2}
            y={height - 4}
            textAnchor="middle"
            fontSize={10}
            fill={viz.textMuted}
          >
            {xLabel}
          </text>

          {/* dots — translucent so overlap reads as density */}
          {dots.map((d, i) => (
            <circle
              key={`${d.id}-${d.index}`}
              cx={d.cx}
              cy={d.cy}
              r={DOT_R}
              fill={useRatioColor ? activeRatioColor(d.ratio ?? 0) : viz.gold}
              fillOpacity={i === active ? 1 : 0.5}
              stroke={i === active ? viz.surface : "none"}
              strokeWidth={i === active ? 2 : 0}
            />
          ))}

          {/* median overlay */}
          {showMedian && dots.length > 0 && (
            <g>
              <line
                x1={scale(median)}
                x2={scale(median)}
                y1={MARGIN.top - 2}
                y2={MARGIN.top + PLOT_H}
                stroke="rgba(255,255,255,0.55)"
                strokeWidth={1}
              />
              <text
                x={scale(median) + 5}
                y={MARGIN.top + 6}
                fontSize={10}
                fill={viz.textSecondary}
              >
                median {formatNumber(median)}
              </text>
            </g>
          )}

          {/* reference line (e.g. daily ad cap) */}
          {referenceLine && (
            <g>
              <line
                x1={scale(referenceLine.x)}
                x2={scale(referenceLine.x)}
                y1={MARGIN.top - 2}
                y2={MARGIN.top + PLOT_H}
                stroke={viz.goldDim}
                strokeWidth={1}
              />
              <text
                x={scale(referenceLine.x) - 5}
                y={MARGIN.top + 6}
                textAnchor="end"
                fontSize={10}
                fill={viz.textSecondary}
              >
                {referenceLine.label}
              </text>
            </g>
          )}
        </svg>
      )}

      {/* tooltip — enhances, never gates (table view carries the values) */}
      {activeDot && width > 0 && (
        <div
          className="absolute z-10 pointer-events-none rounded-lg px-3 py-2 text-xs shadow-lg"
          style={{
            left: Math.min(Math.max(activeDot.cx, 60), width - 80),
            top: activeDot.cy - 8,
            transform: "translate(-50%, -100%)",
            backgroundColor: "#222222",
            border: `1px solid rgba(255,255,255,0.12)`,
          }}
        >
          {activeDot.tooltip.map((line) => (
            <div key={line.label} className="whitespace-nowrap">
              <span className="font-semibold" style={{ color: viz.text }}>
                {line.value}
              </span>{" "}
              <span style={{ color: viz.textMuted }}>{line.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
