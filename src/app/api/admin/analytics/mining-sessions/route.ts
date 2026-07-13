import { analyticsRpcResponse } from "@/lib/adminAnalytics";

export async function GET() {
  return analyticsRpcResponse("admin_mining_sessions_per_user");
}
