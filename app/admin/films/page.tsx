export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import DeleteFilmBtn from "./DeleteFilmBtn";
import FilmsReorder from "./FilmsReorder";

export default async function AdminFilmsPage() {
  const { data: films } = await supabase
    .from("films")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", marginBottom: "0.5rem" }}>Manage</p>
          <h1 style={{ fontFamily: "var(--f-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--c-text)" }}>Films</h1>
        </div>
        <Link href="/admin/films/new" className="admin-btn admin-btn-primary">+ Add Film</Link>
      </div>

      {!films?.length ? (
        <div className="admin-card" style={{ textAlign: "center", padding: "4rem" }}>
          <p style={{ color: "var(--c-muted)", marginBottom: "1.5rem" }}>No films yet.</p>
          <Link href="/admin/films/new" className="admin-btn admin-btn-primary">Add your first film</Link>
        </div>
      ) : (
        <FilmsReorder films={films} />
      )}
    </div>
  );
}
