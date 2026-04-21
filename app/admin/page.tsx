export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminHome() {
  const { data: films } = await supabase.from("films").select("id, year").order("year", { ascending: false });
  const total = films?.length ?? 0;
  const latestYear = films?.[0]?.year ?? "—";

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontFamily: "var(--f-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", marginBottom: "0.5rem" }}>Overview</p>
        <h1 style={{ fontFamily: "var(--f-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--c-text)" }}>Dashboard</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1px", border: "1px solid var(--c-border)", marginBottom: "3rem" }}>
        {[
          { label: "Total Films", value: total },
          { label: "Latest Year", value: latestYear },
        ].map(({ label, value }) => (
          <div key={label} className="admin-card">
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-muted)", marginBottom: "0.75rem" }}>{label}</p>
            <p style={{ fontFamily: "var(--f-serif)", fontSize: "2.5rem", fontWeight: 700, color: "var(--c-text)" }}>{value}</p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontFamily: "var(--f-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-muted)", marginBottom: "1.25rem" }}>Quick Links</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/admin/films/new" className="admin-btn admin-btn-primary">+ Add Film</Link>
          <Link href="/admin/films"     className="admin-btn admin-btn-ghost">Manage Films</Link>
          <Link href="/admin/about"     className="admin-btn admin-btn-ghost">Edit About</Link>
          <Link href="/admin/settings"  className="admin-btn admin-btn-ghost">Settings</Link>
          <Link href="/" target="_blank" className="admin-btn admin-btn-ghost">View Site ↗</Link>
        </div>
      </div>
    </div>
  );
}
