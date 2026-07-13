import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { adminSupabase } from "@/lib/supabase/admin";

// Shared handler for the read-only analytics endpoints: authorize against
// admin_sessions, then call the SECURITY DEFINER RPC with the service_role
// client (the RPCs are locked to service_role in the database).
export async function analyticsRpcResponse(
  rpc: string,
  params?: Record<string, unknown>,
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await adminSupabase.rpc(rpc, params);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data ?? [] });
}
