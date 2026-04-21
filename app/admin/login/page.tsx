"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) {
      router.push("/admin");
    } else {
      setError("Invalid email or password.");
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
            <input
              className="form__input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="password">Password</label>
            <input
              className="form__input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p style={{ color: "#ef4444", fontSize: "0.8rem" }}>{error}</p>}
          <button
            type="submit"
            className="form__submit"
            style={{ marginTop: "0.5rem", width: "100%", justifyContent: "center" }}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
