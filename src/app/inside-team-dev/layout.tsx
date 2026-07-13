import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminSupabase } from "@/lib/supabase/admin";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("admin_session")?.value;

    if (!sessionId) {
      redirect("/login");
    }

    const { data: session, error } = await adminSupabase
      .from("admin_sessions")
      .select("admin_email, role, expires_at")
      .eq("id", sessionId)
      .single();

    if (error || !session) {
      console.error("AdminLayout: Session not found", error);
      redirect("/login");
    }

    if (new Date(session.expires_at) < new Date()) {
      console.warn(`Session expired for: ${session.admin_email}`);
      cookieStore.delete("admin_session");
      redirect("/login");
    }

    return (
      <AdminShell>
        {children}
      </AdminShell>
    );
  } catch (error) {
    console.error("Admin verification failed", error);
    redirect("/login");
  }
}
