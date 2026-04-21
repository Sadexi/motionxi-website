"use client";
import { useEffect, useState } from "react";
import type { Film } from "@/lib/supabase";

export default function FilmModal({ film, onClose }: { film: Film | null; onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubPct, setScrubPct] = useState(22);

  useEffect(() => {
    if (film) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsPlaying(false);
      setScrubPct(22);
    }
  }, [film]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!film) return null;

  const credits = [
    ["Director", "Suleman Ade"],
    ...Object.entries(film).filter(([k]) =>
      ["dp", "editor", "score", "sound", "colour"].includes(k) && film[k as keyof Film]
    ),
  ];

  return (
    <div
      className="modal is-open"
      role="dialog"
      aria-modal="true"
      aria-label="Film detail"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button className="modal__close" onClick={onClose} aria-label="Close film detail">✕</button>
      <div className="modal__inner">

        {/* Player */}
        <div className="player" style={{ width: "100%", aspectRatio: "16/9", background: "#060504", position: "relative", overflow: "hidden", border: "1px solid var(--c-border)" }}>
          {film.youtube_id ? (
            <iframe
              src={`https://www.youtube.com/embed/${film.youtube_id}?autoplay=0`}
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={film.title}
            />
          ) : (
            <>
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                <div style={{ width: 52, height: 52, border: "1px solid var(--c-border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97757" strokeWidth="1.5"><polygon points="5,3 19,12 5,21" /></svg>
                </div>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-muted)" }}>No source attached</p>
              </div>
              {/* Mock controls */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "3.5rem 1.5rem 1.25rem", background: "linear-gradient(to top, rgba(4,3,2,0.98) 0%, transparent 100%)", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <div
                  style={{ width: "100%", height: 2, background: "rgba(255,255,255,0.12)", cursor: "pointer", position: "relative" }}
                  onClick={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setScrubPct(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
                  }}
                >
                  <div style={{ height: "100%", width: `${scrubPct}%`, background: "var(--c-orange)" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{ width: 32, height: 32, border: "1px solid var(--c-border)", borderRadius: "50%", background: "none", color: "var(--c-muted)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                      : <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}><polygon points="5,3 19,12 5,21" /></svg>
                    }
                  </button>
                  <span style={{ fontSize: "0.68rem", color: "var(--c-muted)", marginLeft: "auto" }}>3:42 / {film.duration}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", border: "1px solid rgba(217,119,87,0.4)", padding: "0.2rem 0.7rem" }}>{film.genre}</span>
          <span className="t-meta">{film.year}</span>
          <span className="t-meta">{film.duration}</span>
        </div>
        <h2 style={{ fontFamily: "var(--f-serif)", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 700, lineHeight: 1.1, marginTop: "0.75rem", marginBottom: "1.25rem" }}>{film.title}</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "var(--c-muted)", maxWidth: "58ch", marginBottom: "2.5rem" }}>{film.synopsis}</p>

        <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", marginBottom: "1rem" }}>Credits</p>
        <div>
          {[["Director", "Suleman Ade"]].map(([role, name], i) => (
            <div key={i} style={{ display: "flex", gap: "2rem", fontSize: "0.82rem", color: "var(--c-muted)", padding: "0.6rem 0", borderBottom: "1px solid var(--c-border)", borderTop: i === 0 ? "1px solid var(--c-border)" : "none" }}>
              <strong style={{ color: "var(--c-text)", fontWeight: 400, minWidth: 140 }}>{role}</strong>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
