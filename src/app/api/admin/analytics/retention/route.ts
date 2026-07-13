import { analyticsRpcResponse } from "@/lib/adminAnalytics";

export async function GET() {
  return analyticsRpcResponse("admin_retention_cohorts");
}
