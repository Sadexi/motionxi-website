import { supabase } from "@/lib/supabase";
import type { Film, SiteContent } from "@/lib/supabase";
import SiteNav from "./components/SiteNav";
import FilmGrain from "./components/FilmGrain";
import FilmGrid from "./components/FilmGrid";
import ScrollReveal from "./components/ScrollReveal";

async function getFilms(): Promise<Film[]> {
  const { data } = await supabase
    .from("films")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

async function getContent(): Promise<Record<string, string>> {
  const { data } = await supabase.from("site_content").select("*");
  const map: Record<string, string> = {};
  (data as SiteContent[] ?? []).forEach((r) => { map[r.key] = r.value; });
  return map;
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const [films, content] = await Promise.all([getFilms(), getContent()]);

  const siteName   = content.site_name   ?? "MotionXI";
  const eyebrow    = content.eyebrow     ?? "Film Production — Scottsdale, AZ";
  const tagline    = content.tagline     ?? "An independent production company crafting films that live at the intersection of image and feeling.";
  const bio        = content.bio         ?? "";
  const bioClosing = content.bio_closing ?? "Our films are less about what is seen and more about what is felt.";
  const aboutImage = content.about_image ?? null;

  return (
    <>
      <SiteNav />
      <main>

        {/* HERO */}
        <section id="hero" aria-label="Introduction">
          <div className="hero">
            <FilmGrain />
            <div className="container hero__inner">
              <p className="t-eyebrow hero__eyebrow anim-1" style={{ marginBottom: "1.75rem" }}>{eyebrow}</p>
              <h1 className="t-hero anim-2" style={{ marginBottom: "1.5rem" }}>
                {siteName.replace("XI", "")}<em>{siteName.includes("XI") ? "XI" : ""}</em>
              </h1>
              <p className="t-body anim-3" style={{ maxWidth: "38ch", marginBottom: "1.5rem" }}>{tagline}</p>
              <div className="hero__rule anim-4" aria-hidden="true" />
              <button
                className="hero__scroll anim-5"
                onClick={() => document.getElementById("films")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Scroll to films"
              >
                <div className="hero__scroll-line" aria-hidden="true" />
                <span className="hero__scroll-label">Scroll</span>
              </button>
            </div>
          </div>
        </section>

        {/* FILMS */}
        <section id="films" className="section" aria-label="Film catalog">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-header__num">01</span>
                <h2 className="t-section-title">Selected Films</h2>
                <div className="section-header__line" aria-hidden="true" />
              </div>
            </ScrollReveal>
            <FilmGrid films={films} />
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--c-border)" }} />

        {/* ABOUT */}
        <section id="about" className="section" aria-label="About MotionXI">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-header__num">02</span>
                <h2 className="t-section-title">The Company</h2>
                <div className="section-header__line" aria-hidden="true" />
              </div>
            </ScrollReveal>
            <div className="about__layout">
              <ScrollReveal>
                <div className="about__portrait" aria-label="Company visual">
                  <div className="about__portrait-inner">
                    {aboutImage ? (
                      <img src={aboutImage} alt="MotionXI" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                    ) : (
                      <span className="about__portrait-ghost">MotionXI</span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="about__pullquote">
                  <p className="t-pullquote">Intimate, deliberate,<br />visually considered.</p>
                </div>
                <p className="t-body about__bio"><strong style={{ color: "var(--c-text)", fontWeight: 500 }}>MotionXI</strong> {bio.replace(/^MotionXI\s+is/, "is")}</p>
                <p className="t-body about__bio">Our work is intimate, deliberate, and visually considered — built on the belief that cinema&apos;s power lies not in spectacle, but in presence.</p>
                <p className="about__closing">{bioClosing}</p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--c-border)" }} />

        {/* CONTACT */}
        <section id="contact" className="section" aria-label="Contact">
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-header__num">03</span>
                <h2 className="t-section-title">Get in Touch</h2>
                <div className="section-header__line" aria-hidden="true" />
              </div>
            </ScrollReveal>
            <div className="contact__layout">
              <ScrollReveal>
                <p className="t-body" style={{ marginBottom: "1.5rem" }}>For collaboration, festival enquiries, distribution rights, or press — get in touch with the MotionXI team.</p>
                <ul style={{ listStyle: "none" }}>
                  <li><span className="contact__link"><span className="contact__link-type">Email</span>Adefilmproductions@gmail.com</span></li>
                  <li><span className="contact__link"><span className="contact__link-type">Instagram</span>@ICUPfr</span></li>
                </ul>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <form className="contact__form" onSubmit={(e) => e.preventDefault()} noValidate>
                  <div className="form__field">
                    <label className="form__label" htmlFor="f-name">Name</label>
                    <input className="form__input" type="text" id="f-name" placeholder="Your name" autoComplete="name" />
                  </div>
                  <div className="form__field">
                    <label className="form__label" htmlFor="f-email">Email</label>
                    <input className="form__input" type="email" id="f-email" placeholder="your@email.com" autoComplete="email" />
                  </div>
                  <div className="form__field">
                    <label className="form__label" htmlFor="f-msg">Message</label>
                    <textarea className="form__input" id="f-msg" placeholder="Tell us about your enquiry..." />
                  </div>
                  <button type="submit" className="form__submit">Send Message</button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p className="t-meta">© 2024 MotionXI. All rights reserved.</p>
          <p className="t-meta">Film Production · Scottsdale, AZ</p>
        </div>
      </footer>
    </>
  );
}
