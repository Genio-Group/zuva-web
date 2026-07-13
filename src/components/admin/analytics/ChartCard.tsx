"use client";

import { clsx } from "clsx";
import { BarChart3, Table2 } from "lucide-react";
import { useState } from "react";
import { viz } from "./theme";

export interface CardStat {
  label: string;
  value: string;
}

export interface CardTable {
  headers: string[];
  rows: (string | number)[][];
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  stats?: CardStat[];
  table?: CardTable;
  isEmpty?: boolean;
  emptyHint?: string;
  error?: string | null;
  refreshing?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Card shell shared by every chart: title, callout stats, a chart/table view
// toggle (the table is the WCAG-clean twin of the plot), and empty/error states.
// While a refetch is in flight the previous render is held at reduced opacity.
export function ChartCard({
  title,
  subtitle,
  stats,
  table,
  isEmpty,
  emptyHint,
  error,
  refreshing,
  children,
  className,
}: ChartCardProps) {
  const [view, setView] = useState<"chart" | "table">("chart");

  return (
    <section
      className={clsx("rounded-xl p-5 flex flex-col gap-4", className)}
      style={{
        backgroundColor: viz.surface,
        border: `1px solid ${viz.border}`,
      }}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold" style={{ color: viz.text }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: viz.textMuted }}>
              {subtitle}
            </p>
          )}
        </div>

        {table && !isEmpty && !error && (
          <div
            className="flex rounded-lg overflow-hidden shrink-0"
            style={{ border: `1px solid ${viz.border}` }}
          >
            {(
              [
                ["chart", BarChart3, "Chart view"],
                ["table", Table2, "Table view"],
              ] as const
            ).map(([key, Icon, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={view === key}
                title={label}
                className="p-1.5 transition-colors"
                style={{
                  color: view === key ? viz.text : viz.textMuted,
                  backgroundColor:
                    view === key ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                <span className="sr-only">{label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {stats && stats.length > 0 && !isEmpty && !error && (
        <dl className="flex flex-wrap gap-x-6 gap-y-2">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-[11px]" style={{ color: viz.textMuted }}>
                {s.label}
              </dt>
              <dd
                className="text-base font-semibold leading-tight"
                style={{ color: viz.text }}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div
        className={clsx("transition-opacity", refreshing && "opacity-60")}
        aria-busy={refreshing || undefined}
      >
        {error ? (
          <p className="text-sm py-10 text-center" style={{ color: "#e66767" }}>
            {error}
          </p>
        ) : isEmpty ? (
          <p
            className="text-sm py-10 text-center"
            style={{ color: viz.textMuted }}
          >
            {emptyHint ?? "No data yet."}
          </p>
        ) : view === "table" && table ? (
          <div className="overflow-x-auto -mx-1 px-1">
            <table
              className="w-full text-xs"
              style={{ color: viz.textSecondary }}
            >
              <thead>
                <tr>
                  {table.headers.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="text-left font-medium py-2 pr-4 whitespace-nowrap"
                      style={{
                        color: viz.textMuted,
                        borderBottom: `1px solid ${viz.border}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ fontVariantNumeric: "tabular-nums" }}>
                {table.rows.map((row, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: rows are static per render
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={table.headers[j] ?? `col-${j}`}
                        className="py-1.5 pr-4 whitespace-nowrap"
                        style={{ borderBottom: `1px solid ${viz.border}` }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
