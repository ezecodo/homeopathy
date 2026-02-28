import { useState, useEffect, useRef } from "react";
import "./App.css";

const SERVICES = [
  {
    n: "01",
    title: "Erstgespräch & Anamnese",
    desc: "In einem ausführlichen Erstgespräch nehme ich mir die Zeit, Ihre Beschwerden, Lebensumstände und Persönlichkeit vollständig zu erfassen – die unverzichtbare Grundlage jeder homöopathischen Behandlung.",
    duration: "90 Min.",
  },
  {
    n: "02",
    title: "Klassische Homöopathie",
    desc: "Auf Basis der detaillierten Anamnese wähle ich das individuell passende Einzelmittel aus, das Ihre Selbstheilungskräfte gezielt anregt und eine nachhaltige Verbesserung bewirkt.",
    duration: "60 Min.",
  },
  {
    n: "03",
    title: "Kinderbehandlung",
    desc: "Sanfte und effektive homöopathische Begleitung für Kinder jeden Alters – von Neugeborenen bis hin zu Jugendlichen. Einfühlsam, spielerisch und ohne Nebenwirkungen.",
    duration: "60 Min.",
  },
  {
    n: "04",
    title: "Chronische Erkrankungen",
    desc: "Langwierige Beschwerden brauchen Zeit und Geduld. Ich begleite Sie ganzheitlich und unterstütze Ihren Organismus dabei, das innere Gleichgewicht wiederzufinden.",
    duration: "75 Min.",
  },
  {
    n: "05",
    title: "Schwangerschaft & Wochenbett",
    desc: "Sanfte homöopathische Begleitung durch Schwangerschaft, Geburtsvorbereitung und Wochenbettzeit – für Mutter und Kind sicher und natürlich abgestimmt.",
    duration: "60 Min.",
  },
  {
    n: "06",
    title: "Online-Beratung",
    desc: "Homöopathische Konsultation bequem per Videogespräch von zu Hause aus – ideal für Folgetermine oder wenn ein persönlicher Besuch nicht möglich ist.",
    duration: "45 Min.",
  },
];

const NetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let animationId;
    let mouse = { x: null, y: null, radius: 120 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1.5;
        this.baseColor = `rgba(139, 168, 134, ${Math.random() * 0.3 + 0.2})`;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * 1.5;
            const directionY = forceDirectionY * force * 1.5;
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 9), 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = dx * dx + dy * dy;

          if (distance < 12000) {
            let opacityValue = 1 - distance / 12000;
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(139, 168, 134, ${opacityValue * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      connect();
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" />;
};

const GlobulesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let animationId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    class Globule {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.15 + 0.05;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 20), 60);
      for (let i = 0; i < count; i++) {
        particles.push(new Globule());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="globules__canvas" />;
};

function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ className, children, id }) {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      id={id}
      className={`${className} ${visible ? "is-visible" : ""}`}
    >
      {children}
    </section>
  );
}

export default function App() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    anliegen: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const closeMenu = () => setMenuOpen(false);
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="app">
      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="nav__container">
          <a href="#hero" className="nav__logo" onClick={closeMenu}>
            <span className="nav__logo-name">Britta Piesbergen</span>
            <span className="nav__logo-tag">Homöopathie</span>
          </a>

          <button
            className={`nav__burger${menuOpen ? " nav__burger--open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`nav__links${menuOpen ? " nav__links--open" : ""}`}>
            {[
              ["#ueber-mich", "Über mich"],
              ["#leistungen", "Leistungen"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={closeMenu} className="nav__link">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#kontakt" className="nav__cta" onClick={closeMenu}>
                Termin anfragen
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero__canvas-container">
          <NetworkCanvas />
          <GlobulesCanvas />
        </div>

        <div className="hero__bg" aria-hidden="true">
          <div className="blob blob--1" />
          <div className="blob blob--2" />
          <div className="blob blob--3" />
        </div>

        <div className="hero__inner container">
          <div className="hero__text">
            <span className="eyebrow">Homöopathische Praxis · Koblenz</span>
            <h1 className="hero__title">
              Natürliche Heilung
              <span className="hero__title-accent">beginnt von innen</span>
            </h1>
            <p className="hero__subtitle">
              Ich begleite Sie auf Ihrem Weg zu einem gesunden und harmonischen
              Leben — einfühlsam, ganzheitlich und individuell auf Sie
              abgestimmt.
            </p>
            <div className="hero__actions">
              <a href="#kontakt" className="btn btn--primary">
                <span>Termin vereinbaren</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#ueber-mich" className="btn btn--ghost">
                Über mich
              </a>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__ring hero__ring--outer" />
            <div className="hero__ring hero__ring--inner" />

            <div className="hero__main-flower">
              <JacarandaFlower />
            </div>

            <div className="hero__badge">
              <span className="badge__n">15+</span>
              <span className="badge__label">
                Jahre
                <br />
                Erfahrung
              </span>
            </div>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── ÜBER MICH ── */}
      <RevealSection className="about reveal-section" id="ueber-mich">
        <div className="container about__inner">
          <div className="about__visual-col">
            <div className="about__frame">
              <div className="about__photo">
                <svg viewBox="0 0 200 240" fill="none">
                  <defs>
                    <linearGradient
                      id="grad1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#d4e4d1" />
                      <stop offset="100%" stopColor="#b8d4b4" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="100"
                    cy="82"
                    r="50"
                    fill="url(#grad1)"
                    opacity=".6"
                  />
                  <ellipse
                    cx="100"
                    cy="205"
                    rx="74"
                    ry="54"
                    fill="url(#grad1)"
                    opacity=".6"
                  />
                </svg>
                <span>Foto folgt</span>
              </div>
              <div className="about__deco-ring" />
              <div className="about__deco-dot" />
            </div>
            <blockquote className="about__quote">
              „Die Homöopathie sieht den Menschen als Ganzes — Körper, Geist und
              Seele sind untrennbar verbunden."
            </blockquote>
          </div>

          <div className="about__content">
            <span className="eyebrow">Über mich</span>
            <h2>Herzlich willkommen in meiner Praxis</h2>
            <p>
              Mein Name ist Britta Piesbergen, und ich bin klassische
              Homöopathin mit über 15 Jahren Erfahrung in der ganzheitlichen
              Gesundheitsbegleitung. Meine Überzeugung ist es, dass wahre
              Heilung nur dann geschehen kann, wenn der Mensch als Einheit
              betrachtet wird — nicht nur seine Symptome.
            </p>
            <p>
              Nach meiner Ausbildung zur Heilpraktikerin spezialisierte ich mich
              auf die klassische Homöopathie nach Samuel Hahnemann. Seitdem
              begleite ich Menschen aller Altersgruppen — von Säuglingen bis ins
              hohe Alter — auf ihrem ganz persönlichen Heilungsweg.
            </p>
            <div className="credentials">
              {[
                ["Heilpraktikerin", "Staatlich geprüft & zugelassen"],
                ["Klassische Homöopathin", "Nach Samuel Hahnemann"],
                ["Mitglied DZVhÄ & DHU", "Deutsche Homöopathie-Verbände"],
              ].map(([title, sub]) => (
                <div className="credential" key={title}>
                  <div className="credential__icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="credential__text">
                    <strong>{title}</strong>
                    <span>{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── LEISTUNGEN ── */}
      <RevealSection className="services reveal-section" id="leistungen">
        <div className="services__bg" aria-hidden="true">
          <div className="blob blob--s1" />
          <div className="blob blob--s2" />
        </div>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Meine Leistungen</span>
            <h2>Wie ich Ihnen helfen kann</h2>
            <p>
              Jeder Mensch ist einzigartig — und so ist auch jede Behandlung.
              Ich nehme mir die Zeit, die Sie brauchen.
            </p>
          </div>
          <div className="services__grid">
            {SERVICES.map(({ n, title, desc, duration }, index) => (
              <div
                className="service-card"
                key={n}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-card__header">
                  <span className="service-card__n">{n}</span>
                  <div className="service-card__line" />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="service-card__footer">
                  <span className="service-card__pill">{duration}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="services__note">
            Preise auf Anfrage. Homöopathische Behandlungen können je nach
            Krankenkasse anteilig erstattet werden.
          </p>
        </div>
      </RevealSection>

      {/* ── KONTAKT ── */}
      <RevealSection className="contact reveal-section" id="kontakt">
        <div className="contact__glow" aria-hidden="true" />
        <div className="container contact__inner">
          <div className="contact__info">
            <span className="eyebrow eyebrow--light">Kontakt</span>
            <h2>Vereinbaren Sie Ihren Termin</h2>
            <p>
              Ich freue mich darauf, Sie kennenzulernen. Schreiben Sie mir eine
              Nachricht — ich antworte innerhalb von 24 Stunden.
            </p>
            <div className="contact__details">
              {[
                {
                  icon: <IconLocation />,
                  label: "Praxisadresse",
                  value: (
                    <>
                      Eppendorfer Weg 42
                      <br />
                      20259 Hamburg
                    </>
                  ),
                },
                {
                  icon: <IconPhone />,
                  label: "Telefon",
                  value: "+49 40 123 456 78",
                },
                {
                  icon: <IconMail />,
                  label: "E-Mail",
                  value: "praxis@britta-piesbergen.de",
                },
                {
                  icon: <IconClock />,
                  label: "Sprechzeiten",
                  value: (
                    <>
                      Mo, Mi, Fr: 9 – 17 Uhr
                      <br />
                      Di, Do: 12 – 19 Uhr
                    </>
                  ),
                },
              ].map(({ icon, label, value }) => (
                <div className="contact__detail" key={label}>
                  <div className="contact__detail-icon">{icon}</div>
                  <div className="contact__detail-content">
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact__form-wrap">
            {sent ? (
              <div className="form-success">
                <div className="form-success__flower">
                  <JacarandaFlower />
                </div>
                <h3>Vielen Dank!</h3>
                <p>
                  Ihre Nachricht ist angekommen. Ich melde mich in Kürze bei
                  Ihnen.
                </p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={onSubmit} noValidate>
                <h3>Nachricht senden</h3>
                <div className="form-row">
                  <Field
                    label="Name *"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ihr vollständiger Name"
                    required
                    value={form.name}
                    onChange={onChange}
                    focused={focusedField === "name"}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <Field
                    label="E-Mail *"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ihre@email.de"
                    required
                    value={form.email}
                    onChange={onChange}
                    focused={focusedField === "email"}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div className="form-row">
                  <Field
                    label="Telefon"
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+49 40 …"
                    value={form.phone}
                    onChange={onChange}
                    focused={focusedField === "phone"}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <div
                    className={`form-group ${focusedField === "anliegen" ? "is-focused" : ""}`}
                  >
                    <label htmlFor="anliegen">Anliegen</label>
                    <select
                      id="anliegen"
                      name="anliegen"
                      value={form.anliegen}
                      onChange={onChange}
                      onFocus={() => setFocusedField("anliegen")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="">Bitte wählen …</option>
                      {[
                        "Erstgespräch",
                        "Folgetermin",
                        "Kinderbehandlung",
                        "Online-Beratung",
                        "Allgemeine Anfrage",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className={`form-group ${focusedField === "message" ? "is-focused" : ""}`}
                >
                  <label htmlFor="message">Nachricht *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Beschreiben Sie kurz Ihr Anliegen …"
                    value={form.message}
                    onChange={onChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <button type="submit" className="btn btn--primary btn--full">
                  <span>Nachricht absenden</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
                <p className="form-note">
                  * Pflichtfelder · Ihre Daten werden vertraulich behandelt.
                </p>
              </form>
            )}
          </div>
        </div>
      </RevealSection>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <span className="footer__brand-name">Britta Piesbergen</span>
            <span className="footer__brand-tag">
              Homöopathische Praxis · Hamburg
            </span>
          </div>
          <nav className="footer__nav" aria-label="Footer-Navigation">
            {[
              ["#ueber-mich", "Über mich"],
              ["#leistungen", "Leistungen"],
              ["#kontakt", "Kontakt"],
              ["#", "Impressum"],
              ["#", "Datenschutz"],
            ].map(([href, label]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <p className="footer__copy">
            © {new Date().getFullYear()} Britta Piesbergen · Alle Rechte
            vorbehalten
          </p>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, id, focused, ...props }) {
  return (
    <div className={`form-group ${focused ? "is-focused" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}

function JacarandaFlower() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className="flower-svg"
    >
      <defs>
        <linearGradient id="petalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a8c5a4" />
          <stop offset="100%" stopColor="#8ba886" />
        </linearGradient>
        <linearGradient id="petalGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#96b892" />
          <stop offset="100%" stopColor="#7aa076" />
        </linearGradient>
      </defs>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse
          key={deg}
          cx="60"
          cy="28"
          rx="10"
          ry="22"
          fill={i % 2 === 0 ? "url(#petalGrad)" : "url(#petalGrad2)"}
          transform={`rotate(${deg} 60 60)`}
          opacity={i % 2 === 0 ? "0.95" : "0.75"}
        />
      ))}
      <circle cx="60" cy="60" r="12" fill="#5a8a56" />
      <circle cx="60" cy="60" r="6" fill="#f5f2ed" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="9.75" />
      <path d="M12 6.75V12l3.75 3.75" />
    </svg>
  );
}
