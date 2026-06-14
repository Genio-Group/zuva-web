import { adminSupabase } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const { data, error } = await adminSupabase
      .from("news")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return NextResponse.json({ data: null });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  }

  const { data, error } = await adminSupabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("[/api/news POST] body:", JSON.stringify(body));

  const { data, error } = await adminSupabase
    .from("news")
    .insert(body)
    .select()
    .single();

  if (error) {
    console.error("[/api/news POST]", error.code, error.message, error.details, error.hint);
    return NextResponse.json({ error: error.message, code: error.code, details: error.details, hint: error.hint }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}

export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();

  const { error } = await adminSupabase
    .from("news")
    .update(updates)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const { error } = await adminSupabase
    .from("news")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
