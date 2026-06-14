import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminSupabase } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("admin_session")?.value;

    if (!sessionId) {
      return NextResponse.json(null);
    }

    const { data: session, error } = await adminSupabase
      .from("admin_sessions")
      .select("admin_email, role, expires_at")
      .eq("id", sessionId)
      .single();

    if (error || !session) {
      return NextResponse.json(null);
    }

    if (new Date(session.expires_at) < new Date()) {
      cookieStore.delete("admin_session");
      return NextResponse.json(null);
    }

    return NextResponse.json({
      email: session.admin_email,
      displayName: null,
      photoURL: null,
      role: session.role,
    });
  } catch (error: any) {
    console.error("Error fetching session:", error);
    return NextResponse.json(null);
  }
}
