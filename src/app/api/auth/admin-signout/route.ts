import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminSupabase } from "@/lib/supabase/admin";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("admin_session")?.value;

    if (sessionId) {
      await adminSupabase
        .from("admin_sessions")
        .delete()
        .eq("id", sessionId);
    }

    cookieStore.delete("admin_session");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Signout error:", error);
    return NextResponse.json(
      { message: "Signout failed" },
      { status: 500 }
    );
  }
}
