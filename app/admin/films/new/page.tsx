import { createFilm } from "@/app/actions/films";
import FilmForm from "../FilmForm";

export default function NewFilmPage() {
  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", marginBottom: "0.5rem" }}>Films</p>
        <h1 style={{ fontFamily: "var(--f-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--c-text)" }}>Add New Film</h1>
      </div>
      <div className="admin-card">
        <FilmForm action={createFilm} />
      </div>
    </div>
  );
}
