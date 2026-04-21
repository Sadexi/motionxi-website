"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail]     = useState("");
  const [password, setPass]   = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(data.error ?? "Login failed.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "var(--f-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", marginBottom: "0.75rem" }}>Admin</p>
          <h1 style={{ fontFamily: "var(--f-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--c-text)" }}>MotionXI</h1>
          <p style={{ color: "var(--c-muted)", fontSize: "0.85rem", marginTop: "0.5rem" }}>Sign in to manage your content.</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="form__field">
            <label className="form__label" htmlFor="email">Email</label>
            <input className="form__input" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required autoComplete="email" />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="password">Password</label>
            <input className="form__input" id="password" type="password" value={password} onChange={e => setPass(e.target.value)} placeholder="••••••••" required autoComplete="current-password" />
          </div>
          {error && <p style={{ color: "#ef4444", fontSize: "0.8rem" }}>{error}</p>}
          <button type="submit" className="form__submit" style={{ marginTop: "0.5rem", width: "100%", justifyContent: "center" }} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
