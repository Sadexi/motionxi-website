"use client";
import { useTransition } from "react";
import type { Film } from "@/lib/supabase";

const GENRES = ["Drama", "Documentary", "Experimental", "Short"];

export default function FilmForm({
  film,
  action,
}: {
  film?: Film;
  action: (formData: FormData) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 640 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        <div>
          <label className="admin-label" htmlFor="title">Title *</label>
          <input className="admin-input" id="title" name="title" required defaultValue={film?.title} placeholder="Film title" />
        </div>
        <div>
          <label className="admin-label" htmlFor="year">Year *</label>
          <input className="admin-input" id="year" name="year" type="number" required defaultValue={film?.year} placeholder="2024" min={1900} max={2100} />
        </div>
        <div>
          <label className="admin-label" htmlFor="genre">Genre *</label>
          <select className="admin-input" id="genre" name="genre" required defaultValue={film?.genre ?? "Drama"}>
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="admin-label" htmlFor="duration">Duration *</label>
          <input className="admin-input" id="duration" name="duration" required defaultValue={film?.duration} placeholder="18 min" />
        </div>
      </div>

      <div>
        <label className="admin-label" htmlFor="synopsis">Synopsis</label>
        <textarea className="admin-input" id="synopsis" name="synopsis" rows={4} defaultValue={film?.synopsis ?? ""} placeholder="Film synopsis…" />
      </div>

      <div>
        <label className="admin-label" htmlFor="youtube_id">YouTube Video ID</label>
        <input className="admin-input" id="youtube_id" name="youtube_id" defaultValue={film?.youtube_id ?? ""} placeholder="e.g. dQw4w9WgXcQ" />
        <p style={{ fontSize: "0.65rem", color: "var(--c-muted)", marginTop: "0.35rem" }}>Paste just the ID from the YouTube URL (after ?v=)</p>
      </div>

      <div>
        <label className="admin-label" htmlFor="thumbnail">Thumbnail Image</label>
        <input className="admin-input" id="thumbnail" name="thumbnail" type="file" accept="image/*" style={{ padding: "0.5rem 0.9rem" }} />
        {film?.thumbnail_url && (
          <p style={{ fontSize: "0.65rem", color: "var(--c-muted)", marginTop: "0.35rem" }}>
            Current: <a href={film.thumbnail_url} target="_blank" rel="noreferrer" style={{ color: "var(--c-orange)" }}>View image</a>
          </p>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
        <button type="submit" className="admin-btn admin-btn-primary" disabled={pending}>
          {pending ? "Saving…" : film ? "Update Film" : "Create Film"}
        </button>
        <a href="/admin/films" className="admin-btn admin-btn-ghost">Cancel</a>
      </div>
    </form>
  );
}
