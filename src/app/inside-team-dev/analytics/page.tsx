"use client";

import { clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChartCard } from "@/components/admin/analytics/ChartCard";
import {
  DotPlot,
  type DotPlotPoint,
} from "@/components/admin/analytics/DotPlot";
import {
  buildCohorts,
  RetentionChart,
} from "@/components/admin/analytics/RetentionChart";
import {
  formatNumber,
  quantile,
  viz,
} from "@/components/admin/analytics/theme";
import { AdminHeader } from "@/components/admin/Header";
import {
  type AdsPerDayRow,
  AnalyticsService,
  type MiningSessionRow,
  type ReferralRow,
  type RetentionRow,
} from "@/services/analytics.service";

const ADS_DAILY_CAP = 5;
const REFRESH_MS = 60_000;

interface Metric<T> {
  data: T[] | null; // null until first successful load
  error: string | null;
}

const idle = { data: null, error: null };

function pct(numerator: number, denominator: number): string {
  if (denominator === 0) return "—";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

export default function AnalyticsPage() {
  const [mining, setMining] = useState<Metric<MiningSessionRow>>(idle);
  const [ads, setAds] = useState<Metric<AdsPerDayRow>>(idle);
  const [referrals, setReferrals] = useState<Metric<ReferralRow>>(idle);
  const [retention, setRetention] = useState<Metric<RetentionRow>>(idle);
  const [adsDays, setAdsDays] = useState<7 | 30>(30);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const load = useCallback(async (days: 7 | 30) => {
    setRefreshing(true);

    // Each metric settles independently; a failure keeps the previous data
    // (the card dims during refetch and only shows an error when it has
    // nothing at all to render).
    const settle = <T,>(
      promise: Promise<T[]>,
      set: React.Dispatch<React.SetStateAction<Metric<T>>>,
    ) =>
      promise
        .then((data) => set({ data, error: null }))
        .catch((err: Error) =>
          set((prev) => ({ data: prev.data, error: err.message })),
        );

    await Promise.allSettled([
      settle(AnalyticsService.miningSessions(), setMining),
      settle(AnalyticsService.adsPerDay(days), setAds),
      settle(AnalyticsService.referrals(), setReferrals),
      settle(AnalyticsService.retention(), setRetention),
    ]);

    setRefreshing(false);
    setUpdatedAt(new Date());
  }, []);

  useEffect(() => {
    load(adsDays);
    const timer = setInterval(() => load(adsDays), REFRESH_MS);
    return () => clearInterval(timer);
  }, [adsDays, load]);

  // ---- Mining sessions (dot plot #1) ----
  const miningView = useMemo(() => {
    const rows = mining.data ?? [];
    const points: DotPlotPoint[] = rows.map((r) => ({
      id: r.user_id,
      value: Number(r.sessions),
      tooltip: [
        { value: String(r.sessions), label: "sessions" },
        { value: String(r.claims), label: "claims" },
      ],
    }));
    const sessions = rows.map((r) => Number(r.sessions)).sort((a, b) => a - b);
    const totalSessions = sessions.reduce((a, b) => a + b, 0);
    const totalClaims = rows.reduce((a, r) => a + Number(r.claims), 0);

    const counts = new Map<number, { users: number; claims: number }>();
    for (const r of rows) {
      const key = Number(r.sessions);
      const cur = counts.get(key) ?? { users: 0, claims: 0 };
      counts.set(key, {
        users: cur.users + 1,
        claims: cur.claims + Number(r.claims),
      });
    }

    return {
      points,
      stats: [
        { label: "Users", value: formatNumber(rows.length) },
        {
          label: "Median sessions",
          value: formatNumber(quantile(sessions, 0.5)),
        },
        { label: "p90", value: formatNumber(quantile(sessions, 0.9)) },
        { label: "Completion", value: pct(totalClaims, totalSessions) },
      ],
      table: {
        headers: ["Sessions", "Users", "Claims (total)"],
        rows: [...counts.entries()]
          .sort((a, b) => a[0] - b[0])
          .map(([s, c]) => [s, c.users, c.claims]),
      },
    };
  }, [mining.data]);

  // ---- Ads per user/day (dot plot #2) ----
  const adsView = useMemo(() => {
    const rows = ads.data ?? [];
    const points: DotPlotPoint[] = rows.map((r) => ({
      id: `${r.user_id}:${r.ad_day}`,
      value: Number(r.ads),
      tooltip: [
        { value: String(r.ads), label: "ads" },
        { value: format(parseISO(r.ad_day), "MMM d"), label: "" },
      ],
    }));
    const values = rows.map((r) => Number(r.ads));
    const total = values.reduce((a, b) => a + b, 0);
    const atCap = values.filter((v) => v >= ADS_DAILY_CAP).length;

    const counts = new Map<number, number>();
    for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);

    return {
      points,
      stats: [
        { label: "User-days", value: formatNumber(rows.length) },
        { label: "At the cap", value: pct(atCap, rows.length) },
        {
          label: "Mean ads/day",
          value: rows.length ? (total / rows.length).toFixed(1) : "—",
        },
      ],
      table: {
        headers: ["Ads watched", "User-days"],
        rows: [...counts.entries()].sort((a, b) => a[0] - b[0]),
      },
    };
  }, [ads.data]);

  // ---- Referrals per referrer (dot plot #3) ----
  const referralView = useMemo(() => {
    const rows = referrals.data ?? [];
    const points: DotPlotPoint[] = rows.map((r) => {
      const total = Number(r.total);
      const active = Number(r.active);
      return {
        id: r.referrer_id,
        value: total,
        ratio: total > 0 ? active / total : 0,
        tooltip: [
          { value: String(total), label: "referred" },
          {
            value: String(active),
            label: `active in last 24h (${pct(active, total)})`,
          },
        ],
      };
    });
    const totals = rows.map((r) => Number(r.total)).sort((a, b) => a - b);
    const sumTotal = totals.reduce((a, b) => a + b, 0);
    const sumActive = rows.reduce((a, r) => a + Number(r.active), 0);

    return {
      points,
      stats: [
        { label: "Referrers", value: formatNumber(rows.length) },
        {
          label: "Median referred",
          value: formatNumber(quantile(totals, 0.5)),
        },
        {
          label: "Top referrer",
          value: totals.length ? formatNumber(totals[totals.length - 1]) : "—",
        },
        { label: "Active rate", value: pct(sumActive, sumTotal) },
      ],
      table: {
        headers: ["Referred", "Active (24h)", "Active %"],
        rows: [...rows]
          .sort((a, b) => Number(b.total) - Number(a.total))
          .slice(0, 15)
          .map((r) => [
            r.total,
            r.active,
            pct(Number(r.active), Number(r.total)),
          ]),
      },
    };
  }, [referrals.data]);

  // ---- Retention cohorts (line chart) ----
  const retentionView = useMemo(() => {
    const rows = retention.data ?? [];
    const cohorts = buildCohorts(rows);
    return {
      rows,
      stats: [
        { label: "Cohorts", value: formatNumber(cohorts.length) },
        {
          label: "Newest cohort",
          value: cohorts.length
            ? `${formatNumber(cohorts[0].size)} users`
            : "—",
        },
      ],
      table: {
        headers: ["Cohort week", "Size", "D0", "D1", "D3", "D7", "D14", "D30"],
        rows: cohorts.map((c) => [
          c.label,
          c.size,
          ...c.values.map((v) => (v === undefined ? "—" : `${v.toFixed(0)}%`)),
        ]),
      },
    };
  }, [retention.data]);

  const cardProps = (metric: Metric<unknown>) => ({
    isEmpty: metric.data !== null && metric.data.length === 0,
    error: metric.data === null ? metric.error : null,
    refreshing: refreshing || (metric.data === null && !metric.error),
  });

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Analytics" />

      <main
        className="flex-1 p-6 overflow-auto"
        style={{ backgroundColor: viz.page }}
      >
        {/* filter row — scopes the charts below it */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div
            className="flex items-center rounded-lg overflow-hidden text-xs font-medium"
            style={{ border: `1px solid ${viz.border}` }}
          >
            {([7, 30] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setAdsDays(d)}
                aria-pressed={adsDays === d}
                className="px-3 py-1.5 transition-colors"
                style={{
                  color: adsDays === d ? "#0A0A0A" : viz.textMuted,
                  backgroundColor: adsDays === d ? viz.gold : "transparent",
                }}
              >
                Last {d} days
              </button>
            ))}
          </div>
          <span className="text-[11px]" style={{ color: viz.textMuted }}>
            Window applies to ads per user-day; other metrics are all-time.
          </span>

          <div className="ml-auto flex items-center gap-3">
            {updatedAt && (
              <span className="text-[11px]" style={{ color: viz.textMuted }}>
                Updated {format(updatedAt, "HH:mm:ss")} · refreshes every 60s
              </span>
            )}
            <button
              type="button"
              onClick={() => load(adsDays)}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
              style={{
                color: viz.textSecondary,
                border: `1px solid ${viz.border}`,
                backgroundColor: viz.surface,
              }}
            >
              <RefreshCw
                className={clsx("h-3.5 w-3.5", refreshing && "animate-spin")}
              />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <ChartCard
            title="Mining sessions per user"
            subtitle="One dot per user who has ever started mining — density shows where the habit sits."
            stats={miningView.stats}
            table={miningView.table}
            emptyHint="No mining events yet — history starts at the app update that ships analytics."
            {...cardProps(mining)}
          >
            <DotPlot
              points={miningView.points}
              xLabel="mining sessions"
              showMedian
              ariaLabel="Distribution of mining sessions per user"
            />
          </ChartCard>

          <ChartCard
            title="Ads watched per user-day"
            subtitle={`One dot per user per day, last ${adsDays} days — dots piled at ${ADS_DAILY_CAP} are users hitting the daily cap.`}
            stats={adsView.stats}
            table={adsView.table}
            emptyHint="No rewarded-ad events in this window yet."
            {...cardProps(ads)}
          >
            <DotPlot
              points={adsView.points}
              xLabel="rewarded ads watched"
              xMax={ADS_DAILY_CAP}
              referenceLine={{ x: ADS_DAILY_CAP, label: "daily cap" }}
              showMedian
              ariaLabel="Distribution of rewarded ads watched per user per day"
            />
          </ChartCard>

          <ChartCard
            title="Referrals per referrer"
            subtitle="One dot per referrer — color shows how many of their referrals mined in the last 24h."
            stats={referralView.stats}
            table={referralView.table}
            emptyHint="No referrals recorded yet."
            className="xl:col-span-2"
            {...cardProps(referrals)}
          >
            <div className="flex flex-col gap-2">
              {/* scale legend for the sequential active-ratio ramp */}
              <div
                className="flex items-center gap-2 text-[11px] self-end"
                style={{ color: viz.textMuted }}
              >
                <span>0% active</span>
                <span
                  className="h-1.5 w-24 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #6e6e66, #ffdd00)",
                  }}
                  aria-hidden
                />
                <span>100% active</span>
              </div>
              <DotPlot
                points={referralView.points}
                xLabel="people referred"
                showMedian
                useRatioColor
                ariaLabel="Distribution of referrals per referrer, colored by share active in the last 24 hours"
              />
            </div>
          </ChartCard>

          <ChartCard
            title="Cohort retention"
            subtitle="Rolling retention by signup week — % of each cohort active on or after day N (any event counts)."
            stats={retentionView.stats}
            table={retentionView.table}
            emptyHint="Cohorts appear as signups accumulate; D7/D30 points need time to age before they mean anything."
            className="xl:col-span-2"
            {...cardProps(retention)}
          >
            <RetentionChart
              rows={retentionView.rows}
              ariaLabel="Retention curves per signup-week cohort"
            />
          </ChartCard>
        </div>
      </main>
    </div>
  );
}
