"use client";
import { useState, useTransition } from "react";
import { updateMultipleContent } from "@/app/actions/content";

export default function SettingsForm({ content }: { content: Record<string, string> }) {
  const [siteName, setSiteName] = useState(content.site_name ?? "MotionXI");
  const [tagline, setTagline]   = useState(content.tagline   ?? "");
  const [eyebrow, setEyebrow]   = useState(content.eyebrow   ?? "");
  const [saved, setSaved]       = useState(false);
  const [pending, start]        = useTransition();

  const handleSave = () => {
    start(async () => {
      await updateMultipleContent([
        { key: "site_name", value: siteName },
        { key: "tagline",   value: tagline  },
        { key: "eyebrow",   value: eyebrow  },
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 560 }}>
      <div>
        <label className="admin-label" htmlFor="site_name">Company Name</label>
        <input className="admin-input" id="site_name" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="MotionXI" />
        <p style={{ fontSize: "0.65rem", color: "var(--c-muted)", marginTop: "0.35rem" }}>Shown in the navigation and hero headline.</p>
      </div>
      <div>
        <label className="admin-label" htmlFor="eyebrow">Eyebrow Label</label>
        <input className="admin-input" id="eyebrow" value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} placeholder="Film Production — Scottsdale, AZ" />
        <p style={{ fontSize: "0.65rem", color: "var(--c-muted)", marginTop: "0.35rem" }}>Small text above the hero headline.</p>
      </div>
      <div>
        <label className="admin-label" htmlFor="tagline">Tagline</label>
        <textarea className="admin-input" id="tagline" rows={3} value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="An independent production company…" />
        <p style={{ fontSize: "0.65rem", color: "var(--c-muted)", marginTop: "0.35rem" }}>Displayed below the hero headline.</p>
      </div>
      <div>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={pending}>
          {pending ? "Saving…" : saved ? "✓ Saved" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
