"use client";

import { useMemo, useState } from "react";

export default function MiningRateCalculator() {
  const [users, setUsers] = useState(100000);
  const [referrals, setReferrals] = useState(0);
  const [day, setDay] = useState(1);

  // Emission table (front-loaded, corrected to ~500M total)
  const emissionTable: Record<number, number> = {
    1: 476000,
    2: 357000,
    3: 238000,
    4: 178000,
    5: 119000,
  };

  function getYear(day: number) {
    if (day <= 365) return 1;
    if (day <= 730) return 2;
    if (day <= 1095) return 3;
    if (day <= 1460) return 4;
    return 5;
  }

  const data = useMemo(() => {
    const safeUsers = Math.max(users, 1);
    const safeDay = Math.min(Math.max(day, 1), 1825);

    const year = getYear(safeDay);
    const dailyEmission = emissionTable[year];

    const baseRate = dailyEmission / safeUsers;

    // Referral boost (capped)
    const MAX_BOOST = 3;
    const boost = Math.min(1 + referrals * 0.25, MAX_BOOST);

    const finalRate = baseRate * boost;

    return {
      year,
      dailyEmission,
      baseRate,
      boost,
      finalRate,
      monthlyEstimate: finalRate * 30,
      yearlyEstimate: finalRate * 365,
    };
  }, [users, referrals, day]);

  return (
    <div className="max-w-4xl py-16 mx-auto px-8 bg-black text-white rounded-2xl shadow-xl border border-gray-800">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Zuva Mining Rate Calculator
      </h2>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm">Total Active Users</label>
          <input
            type="number"
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
            className="w-full mt-1 p-2 rounded bg-gray-900 border border-gray-700"
          />
        </div>

        <div>
          <label className="text-sm">Referrals</label>
          <input
            type="number"
            value={referrals}
            onChange={(e) => setReferrals(Number(e.target.value))}
            className="w-full mt-1 p-2 rounded bg-gray-900 border border-gray-700"
          />
        </div>

        <div>
          <label className="text-sm">Day (1 - 1825)</label>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="w-full mt-1 p-2 rounded bg-gray-900 border border-gray-700"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-gray-900 p-4 rounded-xl space-y-3">
        <div className="flex justify-between">
          <span>Year</span>
          <span>{data.year}</span>
        </div>

        <div className="flex justify-between">
          <span>Daily Network Emission</span>
          <span>{data.dailyEmission.toLocaleString()} ZUVA</span>
        </div>

        <div className="flex justify-between">
          <span>Base Rate</span>
          <span>{data.baseRate.toFixed(6)} /day</span>
        </div>

        <div className="flex justify-between">
          <span>Referral Boost</span>
          <span>{data.boost.toFixed(2)}×</span>
        </div>

        <div className="flex justify-between font-bold text-green-400">
          <span>Final Mining Rate</span>
          <span>{data.finalRate.toFixed(6)} ZUVA/day</span>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Monthly Estimate</span>
          <span>{data.monthlyEstimate.toFixed(4)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Yearly Estimate</span>
          <span>{data.yearlyEstimate.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
}