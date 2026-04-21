"use client";
import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="form__submit"
      style={{ marginTop: "0.5rem", width: "100%", justifyContent: "center" }}
      disabled={pending}>
      {pending ? "Signing in…" : "Sign In"}
    </button>
  );
}

export default function LoginPage() {
  const [error, dispatch] = useFormState(loginAction, "");

  return (
    <div style={{ minHeight: "100vh", background: "var(--c-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "var(--f-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-orange)", marginBottom: "0.75rem" }}>Admin</p>
          <h1 style={{ fontFamily: "var(--f-serif)", fontSize: "2rem", fontWeight: 700, color: "var(--c-text)" }}>MotionXI</h1>
          <p style={{ color: "var(--c-muted)", fontSize: "0.85rem", marginTop: "0.5rem" }}>Sign in to manage your content.</p>
        </div>
        <form action={dispatch} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="form__field">
            <label className="form__label" htmlFor="email">Email</label>
            <input className="form__input" id="email" name="email" type="email" placeholder="your@email.com" required autoComplete="email" />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="password">Password</label>
            <input className="form__input" id="password" name="password" type="password" placeholder="••••••••" required autoComplete="current-password" />
          </div>
          {error && <p style={{ color: "#ef4444", fontSize: "0.8rem" }}>{error}</p>}
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
