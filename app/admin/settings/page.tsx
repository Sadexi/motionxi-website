export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const { data } = await supabase.from("site_content").select("*");
  const content: Record<string, string> = {};
  (data ?? []).forEach((r: { key: string; value: string }) => { content[r.key] = r.value; });

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", marginBottom: "0.5rem" }}>Configuration</p>
        <h1 style={{ fontFamily: "var(--f-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--c-text)" }}>Settings</h1>
      </div>
      <div className="admin-card">
        <SettingsForm content={content} />
      </div>
    </div>
  );
}
