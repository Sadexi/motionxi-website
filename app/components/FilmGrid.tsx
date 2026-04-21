"use client";
import { useState, useEffect, useRef } from "react";
import type { Film } from "@/lib/supabase";
import FilmModal from "./FilmModal";

const GRADIENTS: Record<string, string> = {
  Drama: "linear-gradient(145deg,#1a1208 0%,#241a0e 60%,#0e0c0a 100%)",
  Documentary: "linear-gradient(145deg,#060c14 0%,#0c1520 60%,#080a0e 100%)",
  Experimental: "linear-gradient(145deg,#101010 0%,#161616 60%,#060606 100%)",
  Short: "linear-gradient(145deg,#160e06 0%,#1c1208 60%,#0c0804 100%)",
};

export default function FilmGrid({ films }: { films: Film[] }) {
  const [genreFilter, setGenreFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [selected, setSelected] = useState<Film | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const genres = ["All", ...Array.from(new Set(films.map((f) => f.genre)))];
  const years  = ["All", ...Array.from(new Set(films.map((f) => String(f.year)))).sort().reverse()];

  const filtered = films.filter(
    (f) =>
      (genreFilter === "All" || f.genre === genreFilter) &&
      (yearFilter === "All" || String(f.year) === yearFilter)
  );

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".film-card");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              (e.target as HTMLElement).style.cssText +=
                "opacity:1;transform:none";
            }, i * 80);
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.05 }
    );
    cards.forEach((c) => {
      c.style.cssText =
        "opacity:0;transform:translateY(24px);transition:opacity 0.55s cubic-bezier(0.16,1,0.3,1),transform 0.55s cubic-bezier(0.16,1,0.3,1)";
      obs.observe(c);
    });
    return () => obs.disconnect();
  }, [filtered.length, genreFilter, yearFilter]);

  return (
    <>
      <div className="filters reveal" role="group" aria-label="Filter films">
        <span className="t-label">Genre</span>
        {genres.map((g) => (
          <button
            key={g}
            className={`filter-btn${genreFilter === g ? " is-active" : ""}`}
            onClick={() => setGenreFilter(g)}
          >
            {g}
          </button>
        ))}
        <div className="filters__sep" aria-hidden="true" />
        <span className="t-label">Year</span>
        {years.map((y) => (
          <button
            key={y}
            className={`filter-btn${yearFilter === y ? " is-active" : ""}`}
            onClick={() => setYearFilter(y)}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="film-grid" ref={gridRef} role="list" aria-label="Films">
        {filtered.length === 0 ? (
          <p style={{ color: "var(--c-muted)", fontSize: ".875rem", padding: "3rem 0", gridColumn: "1/-1" }}>
            No films match the selected filters.
          </p>
        ) : (
          filtered.map((f) => {
            const scanLines = Array.from({ length: 8 }, (_, j) =>
              `<line x1="0" y1="${j * 14}%" x2="100%" y2="${j * 14}%" stroke="white" stroke-width="0.5"/>`
            ).join("");
            const grad = f.gradient || GRADIENTS[f.genre] || GRADIENTS.Short;
            return (
              <article
                key={f.id}
                className="film-card"
                role="listitem"
                tabIndex={0}
                onClick={() => setSelected(f)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(f)}
                aria-label={`Open ${f.title}`}
              >
                <div className="film-card__thumb" aria-hidden="true">
                  <div
                    className="film-card__thumb-bg"
                    style={{ background: grad, position: "absolute", inset: 0 }}
                  >
                    {f.thumbnail_url ? (
                      <img
                        src={f.thumbnail_url}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                      />
                    ) : (
                      <svg
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.055 }}
                        xmlns="http://www.w3.org/2000/svg"
                        dangerouslySetInnerHTML={{ __html: scanLines }}
                      />
                    )}
                  </div>
                  <div className="film-card__overlay">
                    <div className="film-card__play" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--c-orange)">
                        <polygon points="3,1 13,7 3,13" />
                      </svg>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "rgba(232,232,232,0.85)", lineHeight: 1.6, textAlign: "center" }}>
                      {f.synopsis?.split(" ").slice(0, 15).join(" ")}…
                    </p>
                  </div>
                </div>
                <div className="film-card__body">
                  <p className="film-card__genre t-eyebrow">{f.genre}</p>
                  <h3 className="t-film-title">{f.title}</h3>
                  <div className="film-card__meta">
                    <span className="t-meta">{f.year}</span>
                    <span className="t-meta">{f.duration}</span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      <FilmModal film={selected} onClose={() => setSelected(null)} />
    </>
  );
}
