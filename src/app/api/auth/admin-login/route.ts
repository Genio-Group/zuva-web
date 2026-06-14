import { NextResponse } from "next/server";
import { adminSupabase } from "@/lib/supabase/admin";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const { data: admin, error } = await adminSupabase
      .from("admins")
      .select("id, email, password, role")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Admin lookup error:", error);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!admin) {
      console.warn(`Admin not found: ${email}`);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (password !== admin.password) {
      console.warn(`Password mismatch for ${email}. Expected: "${admin.password}", Got: "${password}"`);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const { data: session, error: sessionError } = await adminSupabase
      .from("admin_sessions")
      .insert({
        admin_email: admin.email,
        role: admin.role,
        expires_at: expiresAt.toISOString(),
      })
      .select("id")
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { message: "Failed to create session" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      email: admin.email,
      role: admin.role,
    });
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { message: "Login failed", error: error.message },
      { status: 500 }
    );
  }
}
