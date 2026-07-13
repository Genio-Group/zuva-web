import type { NextRequest } from "next/server";
import { analyticsRpcResponse } from "@/lib/adminAnalytics";

export async function GET(req: NextRequest) {
  const raw = Number(req.nextUrl.searchParams.get("days"));
  const days = Number.isInteger(raw) && raw >= 1 && raw <= 365 ? raw : 30;
  return analyticsRpcResponse("admin_ads_per_user_day", { p_days: days });
}
