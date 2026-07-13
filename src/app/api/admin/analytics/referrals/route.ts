import { analyticsRpcResponse } from "@/lib/adminAnalytics";

export async function GET() {
  return analyticsRpcResponse("admin_referrals_per_referrer");
}
