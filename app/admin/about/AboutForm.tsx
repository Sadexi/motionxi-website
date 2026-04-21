"use client";
import { useState, useTransition } from "react";
import { updateMultipleContent, uploadAboutImage } from "@/app/actions/content";

export default function AboutForm({ content }: { content: Record<string, string> }) {
  const [bio, setBio]           = useState(content.bio         ?? "");
  const [closing, setClosing]   = useState(content.bio_closing ?? "");
  const [saved, setSaved]       = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      await updateMultipleContent([
        { key: "bio",         value: bio     },
        { key: "bio_closing", value: closing },
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 640 }}>
      <div>
        <label className="admin-label" htmlFor="bio">Company Bio</label>
        <textarea
          className="admin-input"
          id="bio"
          rows={6}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="MotionXI is an independent film production company…"
        />
      </div>
      <div>
        <label className="admin-label" htmlFor="closing">Closing Quote</label>
        <input
          className="admin-input"
          id="closing"
          value={closing}
          onChange={(e) => setClosing(e.target.value)}
          placeholder="Our films are less about what is seen…"
        />
        <p style={{ fontSize: "0.65rem", color: "var(--c-muted)", marginTop: "0.35rem" }}>Appears as a pull-quote at the bottom of the About section.</p>
      </div>
      <div>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={pending}>
          {pending ? "Saving…" : saved ? "✓ Saved" : "Save Changes"}
        </button>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid var(--c-border)", margin: "0.5rem 0" }} />

      <div>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-muted)", marginBottom: "1rem" }}>Profile / Company Photo</p>
        {content.about_image && (
          <img src={content.about_image} alt="About" style={{ width: 120, height: 160, objectFit: "cover", marginBottom: "1rem", border: "1px solid var(--c-border)" }} />
        )}
        <form action={uploadAboutImage}>
          <input className="admin-input" type="file" name="image" accept="image/*" style={{ padding: "0.5rem 0.9rem", marginBottom: "0.75rem" }} />
          <button type="submit" className="admin-btn admin-btn-ghost">Upload Photo</button>
        </form>
      </div>
    </div>
  );
}
