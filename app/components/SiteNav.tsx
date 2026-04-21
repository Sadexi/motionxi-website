"use client";
import { useEffect, useState } from "react";

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["films", "about", "contact"];
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 160 && r.bottom > 160) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header>
      <nav className={`nav${scrolled ? " is-scrolled" : ""}`} aria-label="Main navigation">
        <div className="container nav__inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button className="nav__brand" onClick={() => navTo("hero")} aria-label="Go to top">MotionXI</button>
          <ul className="nav__links" style={{ listStyle: "none" }}>
            {["films", "about", "contact"].map((s) => (
              <li key={s}>
                <button
                  className={`nav__link${active === s ? " is-active" : ""}`}
                  onClick={() => navTo(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
