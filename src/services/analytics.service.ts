export interface MiningSessionRow {
  user_id: string;
  sessions: number;
  claims: number;
}

export interface AdsPerDayRow {
  user_id: string;
  ad_day: string; // UTC day, e.g. "2026-07-10"
  ads: number;
}

export interface ReferralRow {
  referrer_id: string;
  total: number;
  active: number;
}

export interface RetentionRow {
  cohort_week: string; // Monday of the signup week
  cohort_size: number;
  day_offset: number; // 0, 1, 3, 7, 14, 30
  retained: number;
}

async function fetchMetric<T>(route: string): Promise<T[]> {
  const res = await fetch(`/api/admin/analytics/${route}`, {
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `Failed to fetch ${route}`);
  return json.data ?? [];
}

export const AnalyticsService = {
  miningSessions() {
    return fetchMetric<MiningSessionRow>("mining-sessions");
  },

  adsPerDay(days: number) {
    return fetchMetric<AdsPerDayRow>(`ads-per-day?days=${days}`);
  },

  referrals() {
    return fetchMetric<ReferralRow>("referrals");
  },

  retention() {
    return fetchMetric<RetentionRow>("retention");
  },
};
