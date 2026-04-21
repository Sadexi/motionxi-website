"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin",          label: "Dashboard" },
  { href: "/admin/films",    label: "Films"     },
  { href: "/admin/about",    label: "About"     },
  { href: "/admin/settings", label: "Settings"  },
];

export default function AdminNav() {
  const path   = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="admin-sidebar">
      <div style={{ padding: "0 1.5rem 2rem", borderBottom: "1px solid var(--c-border)" }}>
        <p style={{ fontFamily: "var(--f-serif)", fontSize: "1.05rem", fontWeight: 600, color: "var(--c-text)" }}>MotionXI</p>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--c-orange)", marginTop: "0.2rem" }}>Admin</p>
      </div>
      <nav style={{ flex: 1, paddingTop: "1.5rem" }}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className={`admin-nav-link${path === href ? " active" : ""}`}>
            {label}
          </Link>
        ))}
      </nav>
      <div style={{ padding: "1.5rem", borderTop: "1px solid var(--c-border)" }}>
        <button onClick={handleSignOut} style={{ background: "none", border: "none", color: "var(--c-muted)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
