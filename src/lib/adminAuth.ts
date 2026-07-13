import { cookies } from "next/headers";
import { adminSupabase } from "@/lib/supabase/admin";

export interface AdminSession {
  admin_email: string;
  role: string;
  expires_at: string;
}

// Same session check the admin layout and /api/auth/me perform:
// admin_session cookie -> admin_sessions row -> not expired.
export async function requireAdmin(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("admin_session")?.value;
  if (!sessionId) return null;

  const { data: session, error } = await adminSupabase
    .from("admin_sessions")
    .select("admin_email, role, expires_at")
    .eq("id", sessionId)
    .single();

  if (error || !session) return null;
  if (new Date(session.expires_at) < new Date()) return null;

  return session;
}
