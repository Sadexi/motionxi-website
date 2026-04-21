export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import AboutForm from "./AboutForm";

export default async function AdminAboutPage() {
  const { data } = await supabase.from("site_content").select("*");
  const content: Record<string, string> = {};
  (data ?? []).forEach((r: { key: string; value: string }) => { content[r.key] = r.value; });

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", marginBottom: "0.5rem" }}>Content</p>
        <h1 style={{ fontFamily: "var(--f-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--c-text)" }}>About</h1>
      </div>
      <div className="admin-card">
        <AboutForm content={content} />
      </div>
    </div>
  );
}
