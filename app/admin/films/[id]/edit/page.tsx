export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import { updateFilm } from "@/app/actions/films";
import FilmForm from "../../FilmForm";
import { notFound } from "next/navigation";

export default async function EditFilmPage({ params }: { params: { id: string } }) {
  const { data: film } = await supabase.from("films").select("*").eq("id", params.id).single();
  if (!film) notFound();

  const action = updateFilm.bind(null, params.id);

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", marginBottom: "0.5rem" }}>Films</p>
        <h1 style={{ fontFamily: "var(--f-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--c-text)" }}>Edit Film</h1>
      </div>
      <div className="admin-card">
        <FilmForm film={film} action={action} />
      </div>
    </div>
  );
}
