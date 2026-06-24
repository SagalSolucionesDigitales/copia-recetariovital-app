import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#2d6a4f",
  primaryLight: "#52b788",
  primaryXLight: "#b7e4c7",
  primaryDark: "#1b4332",
  accent: "#d4a017",
  accentLight: "#f6d860",
  coral: "#e07a5f",
  bg: "#fafaf8",
  bgCard: "#ffffff",
  bgSection: "#f0f7f4",
  text: "#1a1a1a",
  textMuted: "#5a6a60",
  textLight: "#8a9e93",
  border: "#d8ede3",
  white: "#ffffff",
};

const recipes = [
  {
    id: 1,
    title: "Ensalada Griega con Aceite de Oliva",
    time: "15 min",
    kcal: 280,
    tags: ["Diabetes", "Hipertensión"],
    emoji: "🥗",
    color: "#e8f5e9",
  },
  {
    id: 2,
    title: "Salmón al Horno con Hierbas",
    time: "30 min",
    kcal: 350,
    tags: ["Colesterol", "Corazón"],
    emoji: "🐟",
    color: "#e3f2fd",
  },
  {
    id: 3,
    title: "Hummus Casero con Verduras",
    time: "20 min",
    kcal: 210,
    tags: ["Diabetes", "Vegano"],
    emoji: "🫘",
    color: "#fff8e1",
  },
  {
    id: 4,
    title: "Pollo a la Provenzal",
    time: "45 min",
    kcal: 320,
    tags: ["Hipertensión", "Sin Gluten"],
    emoji: "🍗",
    color: "#fce4ec",
  },
  {
    id: 5,
    title: "Tabbouleh de Quinoa",
    time: "25 min",
    kcal: 240,
    tags: ["Diabetes", "Vegano"],
    emoji: "🌿",
    color: "#f3e5f5",
  },
  {
    id: 6,
    title: "Gazpacho Andaluz",
    time: "10 min",
    kcal: 120,
    tags: ["Corazón", "Colesterol"],
    emoji: "🍅",
    color: "#ffebee",
  },
];

const features = [
  {
    icon: "🚫",
    title: "Sin anuncios, sin distracciones",
    desc: "Cocina en paz. Nuestra plataforma no tiene publicidad ni scroll infinito que te aleje de lo importante.",
  },
  {
    icon: "🥦",
    title: "10,000+ recetas mediterráneas",
    desc: "Biblioteca premium curada por nutricionistas especializados en condiciones médicas crónicas.",
  },
  {
    icon: "📋",
    title: "Plan de comidas semanal",
    desc: "Organiza tu semana según tu condición médica. El sistema adapta las recetas a tus necesidades.",
  },
  {
    icon: "🛒",
    title: "Lista de compras automática",
    desc: "Genera tu lista de supermercado en un clic. Agrupada por categorías para ahorrar tiempo.",
  },
  {
    icon: "📚",
    title: "Biblioteca personal",
    desc: "Guarda tus recetas favoritas y crea colecciones personalizadas a tu estilo de vida.",
  },
  {
    icon: "💊",
    title: "Filtros por condición médica",
    desc: "Filtra recetas según diabetes, hipertensión, colesterol alto, celiaquía y más de 20 condiciones.",
  },
];

const conditions = [
  { name: "Diabetes tipo 2", emoji: "🩸", count: "1,240 recetas", color: "#e8f5e9" },
  { name: "Hipertensión", emoji: "❤️", count: "980 recetas", color: "#ffebee" },
  { name: "Colesterol alto", emoji: "🫀", count: "870 recetas", color: "#e3f2fd" },
  { name: "Celiaquía", emoji: "🌾", count: "760 recetas", color: "#fff8e1" },
  { name: "Enfermedad renal", emoji: "🫁", count: "540 recetas", color: "#f3e5f5" },
  { name: "Hipotiroidismo", emoji: "⚖️", count: "620 recetas", color: "#e0f7fa" },
];

const plans = [
  {
    name: "Básico",
    price: "Gratis",
    priceNote: "Para siempre",
    features: [
      "50 recetas mediterráneas",
      "Filtro por 3 condiciones",
      "Lista de compras (1/semana)",
      "Acceso web",
    ],
    cta: "Empezar gratis",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    priceNote: "por mes",
    features: [
      "10,000+ recetas premium",
      "Todos los filtros médicos",
      "Plan semanal personalizado",
      "Lista de compras ilimitada",
      "Biblioteca personal ilimitada",
      "Soporte prioritario",
    ],
    cta: "Comenzar 14 días gratis",
    highlighted: true,
  },
  {
    name: "Familiar",
    price: "$14.99",
    priceNote: "por mes",
    features: [
      "Todo lo de Premium",
      "Hasta 5 perfiles",
      "Perfil médico por persona",
      "Planes individualizados",
      "Historial de recetas",
    ],
    cta: "Prueba familiar gratis",
    highlighted: false,
  },
];

const testimonials = [
  {
    name: "María González",
    condition: "Diabética tipo 2",
    avatar: "👩‍🦳",
    text: "Desde que uso Recetario Vital, controlo mucho mejor mi glucosa. Las recetas son deliciosas y no me siento como si estuviera a dieta.",
  },
  {
    name: "Carlos Ramos",
    condition: "Hipertensión",
    avatar: "👨‍🦱",
    text: "Mi médico se sorprendió con mis últimos análisis. Bajar la sal sin perder el sabor parecía imposible hasta que encontré esta app.",
  },
  {
    name: "Ana López",
    condition: "Colesterol alto",
    avatar: "👩‍🦰",
    text: "La planificación semanal me ahorra horas. Sé exactamente qué comprar y cocinar, y mi colesterol bajó 30 puntos en 3 meses.",
  },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15, ...options }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeTag, setActiveTag] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const tags = ["Todos", "Diabetes", "Hipertensión", "Colesterol", "Corazón", "Vegano", "Sin Gluten"];
  const filtered = activeTag === "Todos"
    ? recipes
    : recipes.filter(r => r.tags.includes(activeTag));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailInput) { setSubmitted(true); setEmailInput(""); }
  };

  const navLinks = [
    { label: "Características", href: "#features" },
    { label: "Condiciones", href: "#conditions" },
    { label: "Recetas", href: "#recipes" },
    { label: "Precios", href: "#pricing" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: COLORS.bg, color: COLORS.text, overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,250,248,0.92)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 28 }}>🫒</span>
          <span style={{ fontWeight: 800, fontSize: 20, color: COLORS.primaryDark, letterSpacing: "-0.5px" }}>
            Recetario <span style={{ color: COLORS.primary }}>Vital</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} style={{
              color: COLORS.textMuted, textDecoration: "none", fontWeight: 500, fontSize: 15,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = COLORS.primary}
              onMouseLeave={e => e.target.style.color = COLORS.textMuted}
            >{l.label}</a>
          ))}
          <a href="#pricing" style={{
            background: COLORS.primary, color: COLORS.white,
            padding: "9px 22px", borderRadius: 10, fontWeight: 600, fontSize: 14,
            textDecoration: "none", transition: "background 0.2s, transform 0.15s",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.primaryDark; e.target.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.target.style.background = COLORS.primary; e.target.style.transform = "scale(1)"; }}
          >Comenzar gratis</a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 24, display: "none", padding: 4,
        }} className="mobile-menu-btn" aria-label="Menú">☰</button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: COLORS.white, borderBottom: `1px solid ${COLORS.border}`,
          padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              color: COLORS.text, textDecoration: "none", fontWeight: 600, fontSize: 17, padding: "6px 0",
            }}>{l.label}</a>
          ))}
          <a href="#pricing" onClick={() => setMenuOpen(false)} style={{
            background: COLORS.primary, color: COLORS.white,
            padding: "12px 20px", borderRadius: 10, fontWeight: 700, fontSize: 15,
            textDecoration: "none", textAlign: "center",
          }}>Comenzar gratis</a>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 60%, ${COLORS.primaryLight} 100%)`,
        color: COLORS.white, padding: "80px 24px 90px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative blobs */}
        <div style={{
          position: "absolute", top: -80, right: -80, width: 320, height: 320,
          borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: -60, width: 240, height: 240,
          borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.15)", borderRadius: 50,
            padding: "7px 18px", fontSize: 13, fontWeight: 600, marginBottom: 28,
            border: "1px solid rgba(255,255,255,0.25)",
          }}>
            🌿 Dieta Mediterránea • Salud Personalizada
          </span>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900,
            lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 24,
          }}>
            Cualquiera puede cocinar{" "}
            <span style={{ color: COLORS.accentLight }}>saludable.</span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 400,
            color: "rgba(255,255,255,0.85)", maxWidth: 560, margin: "0 auto 40px",
            lineHeight: 1.6,
          }}>
            Recetas mediterráneas premium adaptadas a tu condición médica. Sin anuncios, sin distracciones. Solo cocina que te hace bien.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#pricing" style={{
              background: COLORS.accent, color: COLORS.primaryDark,
              padding: "15px 32px", borderRadius: 12, fontWeight: 800, fontSize: 16,
              textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 20px rgba(212,160,23,0.35)",
            }}
              onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 8px 28px rgba(212,160,23,0.45)"; }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 20px rgba(212,160,23,0.35)"; }}
            >
              Empezar gratis →
            </a>
            <a href="#recipes" style={{
              background: "rgba(255,255,255,0.15)", color: COLORS.white,
              padding: "15px 32px", borderRadius: 12, fontWeight: 600, fontSize: 16,
              textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.15)"}
            >
              Ver recetas
            </a>
          </div>

          {/* stats */}
          <div style={{
            display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap",
            marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.2)",
          }}>
            {[
              { val: "10,000+", lab: "Recetas premium" },
              { val: "25+", lab: "Condiciones médicas" },
              { val: "0", lab: "Anuncios" },
              { val: "5★", lab: "Valoración media" },
            ].map(s => (
              <div key={s.lab} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-1px" }}>{s.val}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500, marginTop: 2 }}>{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{
              background: COLORS.primaryXLight, color: COLORS.primaryDark,
              padding: "5px 16px", borderRadius: 50, fontSize: 13, fontWeight: 700,
            }}>Características</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginTop: 16, letterSpacing: "-1px" }}>
              Todo lo que necesitas para comer bien
            </h2>
            <p style={{ color: COLORS.textMuted, fontSize: 17, maxWidth: 520, margin: "12px auto 0", lineHeight: 1.6 }}>
              Una plataforma pensada para personas reales, con condiciones reales.
            </p>
          </div>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {features.map((f, i) => (
            <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div
                onMouseEnter={() => setHoveredCard(`feat-${i}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === `feat-${i}` ? COLORS.bgSection : COLORS.white,
                  border: `1.5px solid ${hoveredCard === `feat-${i}` ? COLORS.primaryLight : COLORS.border}`,
                  borderRadius: 16, padding: "28px 28px",
                  transition: "all 0.25s",
                  transform: hoveredCard === `feat-${i}` ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hoveredCard === `feat-${i}` ? "0 12px 32px rgba(45,106,79,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: COLORS.primaryDark }}>{f.title}</h3>
                <p style={{ color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── CONDITIONS ── */}
      <section id="conditions" style={{ background: COLORS.bgSection, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span style={{
                background: "#fce4ec", color: "#b71c1c",
                padding: "5px 16px", borderRadius: 50, fontSize: 13, fontWeight: 700,
              }}>Condiciones médicas</span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginTop: 16, letterSpacing: "-1px" }}>
                Recetas diseñadas para <span style={{ color: COLORS.primary }}>tu salud</span>
              </h2>
              <p style={{ color: COLORS.textMuted, fontSize: 16.5, maxWidth: 500, margin: "12px auto 0", lineHeight: 1.6 }}>
                Filtra recetas según más de 25 condiciones médicas verificadas por nutricionistas clínicos.
              </p>
            </div>
          </AnimatedSection>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20,
          }}>
            {conditions.map((c, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.07}s` }}>
                <div
                  onMouseEnter={() => setHoveredCard(`cond-${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: c.color,
                    borderRadius: 16, padding: "24px 22px",
                    cursor: "pointer",
                    transform: hoveredCard === `cond-${i}` ? "scale(1.03)" : "scale(1)",
                    transition: "transform 0.22s, box-shadow 0.22s",
                    boxShadow: hoveredCard === `cond-${i}` ? "0 8px 24px rgba(0,0,0,0.1)" : "0 2px 6px rgba(0,0,0,0.04)",
                    border: "1.5px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{c.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.primaryDark, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500 }}>{c.count}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div style={{
              textAlign: "center", marginTop: 40,
              color: COLORS.textMuted, fontSize: 15,
            }}>
              + Síndrome metabólico, Artritis, Osteoporosis, Insuficiencia cardíaca y más...
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── RECIPES ── */}
      <section id="recipes" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{
              background: COLORS.primaryXLight, color: COLORS.primaryDark,
              padding: "5px 16px", borderRadius: 50, fontSize: 13, fontWeight: 700,
            }}>Recetas destacadas</span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginTop: 16, letterSpacing: "-1px" }}>
              Descubre recetas que te harán bien
            </h2>
          </div>
        </AnimatedSection>

        {/* Filter pills */}
        <AnimatedSection>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: "8px 18px", borderRadius: 50,
                  border: `1.5px solid ${activeTag === tag ? COLORS.primary : COLORS.border}`,
                  background: activeTag === tag ? COLORS.primary : COLORS.white,
                  color: activeTag === tag ? COLORS.white : COLORS.textMuted,
                  fontWeight: 600, fontSize: 13.5, cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
              >{tag}</button>
            ))}
          </div>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {filtered.map((r, i) => (
            <AnimatedSection key={r.id} style={{ transitionDelay: `${i * 0.07}s` }}>
              <div
                onMouseEnter={() => setHoveredCard(`rec-${r.id}`)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: COLORS.white,
                  borderRadius: 18, overflow: "hidden",
                  border: `1.5px solid ${COLORS.border}`,
                  transition: "all 0.25s",
                  transform: hoveredCard === `rec-${r.id}` ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hoveredCard === `rec-${r.id}` ? "0 16px 40px rgba(45,106,79,0.13)" : "0 2px 10px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                }}
              >
                {/* image placeholder */}
                <div style={{
                  background: r.color, height: 160,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 64,
                }}>{r.emoji}</div>

                <div style={{ padding: "20px 20px 22px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10, color: COLORS.primaryDark, lineHeight: 1.35 }}>
                    {r.title}
                  </h3>
                  <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                    <span style={{ fontSize: 13, color: COLORS.textMuted }}>⏱ {r.time}</span>
                    <span style={{ fontSize: 13, color: COLORS.textMuted }}>🔥 {r.kcal} kcal</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {r.tags.map(t => (
                      <span key={t} style={{
                        background: COLORS.bgSection, color: COLORS.primary,
                        padding: "3px 10px", borderRadius: 50, fontSize: 12, fontWeight: 600,
                        border: `1px solid ${COLORS.primaryXLight}`,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <a href="#pricing" style={{
              display: "inline-block",
              background: COLORS.primary, color: COLORS.white,
              padding: "14px 36px", borderRadius: 12, fontWeight: 700, fontSize: 16,
              textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.background = COLORS.primaryDark; e.target.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.target.style.background = COLORS.primary; e.target.style.transform = "scale(1)"; }}
            >
              Ver las 10,000+ recetas →
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: COLORS.bgSection, padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{
                background: "#fff8e1", color: "#e65100",
                padding: "5px 16px", borderRadius: 50, fontSize: 13, fontWeight: 700,
              }}>Cómo funciona</span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginTop: 16, letterSpacing: "-1px" }}>
                Empieza en 3 pasos simples
              </h2>
            </div>
          </AnimatedSection>

          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { step: "01", title: "Crea tu perfil médico", desc: "Indica tus condiciones, alergias y preferencias alimentarias.", emoji: "👤" },
              { step: "02", title: "Recibe recetas personalizadas", desc: "El sistema te muestra recetas mediterráneas adaptadas a tu salud.", emoji: "🍽️" },
              { step: "03", title: "Planifica y compra", desc: "Arma tu menú semanal y genera la lista de compras automáticamente.", emoji: "📲" },
            ].map((s, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.15}s`, flex: "1 1 240px", maxWidth: 280 }}>
                <div style={{ textAlign: "center", padding: "10px 0" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 30, margin: "0 auto 18px",
                    boxShadow: "0 4px 16px rgba(45,106,79,0.2)",
                  }}>{s.emoji}</div>
                  <div style={{
                    fontSize: 12, fontWeight: 700, color: COLORS.primaryLight,
                    letterSpacing: 2, marginBottom: 8,
                  }}>PASO {s.step}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: COLORS.primaryDark }}>{s.title}</h3>
                  <p style={{ color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{
              background: COLORS.primaryXLight, color: COLORS.primaryDark,
              padding: "5px 16px", borderRadius: 50, fontSize: 13, fontWeight: 700,
            }}>Testimonios</span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginTop: 16, letterSpacing: "-1px" }}>
              Personas reales, resultados reales
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 24,
        }}>
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div style={{
                background: COLORS.white, borderRadius: 18, padding: "28px 24px",
                border: `1.5px solid ${COLORS.border}`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}>
                <div style={{ fontSize: 28, marginBottom: 14, color: COLORS.accent }}>★★★★★</div>
                <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: COLORS.bgSection,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.primaryDark }}>{t.name}</div>
                    <div style={{ fontSize: 12.5, color: COLORS.textMuted, fontWeight: 500 }}>{t.condition}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: COLORS.bgSection, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span style={{
                background: "#e8f5e9", color: COLORS.primaryDark,
                padding: "5px 16px", borderRadius: 50, fontSize: 13, fontWeight: 700,
              }}>Precios</span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginTop: 16, letterSpacing: "-1px" }}>
                Elige tu plan
              </h2>
              <p style={{ color: COLORS.textMuted, fontSize: 16.5, maxWidth: 480, margin: "12px auto 0", lineHeight: 1.6 }}>
                Sin contratos. Cancela cuando quieras. Prueba gratis 14 días.
              </p>
            </div>
          </AnimatedSection>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24, alignItems: "start",
          }}>
            {plans.map((p, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div
                  onMouseEnter={() => setHoveredPlan(i)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  style={{
                    background: p.highlighted
                      ? `linear-gradient(145deg, ${COLORS.primaryDark}, ${COLORS.primary})`
                      : COLORS.white,
                    borderRadius: 20, padding: "32px 28px",
                    border: p.highlighted ? "none" : `1.5px solid ${COLORS.border}`,
                    color: p.highlighted ? COLORS.white : COLORS.text,
                    transition: "all 0.25s",
                    transform: p.highlighted
                      ? hoveredPlan === i ? "scale(1.03)" : "scale(1.01)"
                      : hoveredPlan === i ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: p.highlighted
                      ? "0 16px 48px rgba(45,106,79,0.3)"
                      : hoveredPlan === i ? "0 10px 30px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
                    position: "relative",
                  }}
                >
                  {p.highlighted && (
                    <div style={{
                      position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                      background: COLORS.accent, color: COLORS.primaryDark,
                      padding: "5px 18px", borderRadius: 50, fontSize: 12, fontWeight: 800,
                      whiteSpace: "nowrap",
                    }}>⭐ MÁS POPULAR</div>
                  )}
                  <div style={{ fontWeight: 800, fontSize: 19, marginBottom: 6 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-1px" }}>{p.price}</span>
                    <span style={{
                      fontSize: 14, fontWeight: 500,
                      color: p.highlighted ? "rgba(255,255,255,0.7)" : COLORS.textMuted,
                    }}>{p.priceNote}</span>
                  </div>
                  <div style={{ height: 1, background: p.highlighted ? "rgba(255,255,255,0.2)" : COLORS.border, margin: "20px 0" }} />
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 11 }}>
                    {p.features.map((f, fi) => (
                      <li key={fi} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14.5 }}>
                        <span style={{ color: p.highlighted ? COLORS.accentLight : COLORS.primary, flexShrink: 0, fontWeight: 700, marginTop: 1 }}>✓</span>
                        <span style={{ color: p.highlighted ? "rgba(255,255,255,0.9)" : COLORS.textMuted, lineHeight: 1.4 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button style={{
                    width: "100%", padding: "13px 0", borderRadius: 11,
                    border: p.highlighted ? "none" : `2px solid ${COLORS.primary}`,
                    background: p.highlighted ? COLORS.accent : "transparent",
                    color: p.highlighted ? COLORS.primaryDark : COLORS.primary,
                    fontWeight: 800, fontSize: 15, cursor: "pointer",
                    transition: "all 0.2s", fontFamily: "'Inter', sans-serif",
                  }}
                    onMouseEnter={e => {
                      if (p.highlighted) { e.target.style.background = COLORS.accentLight; }
                      else { e.target.style.background = COLORS.primary; e.target.style.color = COLORS.white; }
                    }}
                    onMouseLeave={e => {
                      if (p.highlighted) { e.target.style.background = COLORS.accent; }
                      else { e.target.style.background = "transparent"; e.target.style.color = COLORS.primary; }
                    }}
                  >{p.cta}</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / EMAIL CAPTURE ── */}
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
        padding: "80px 24px", textAlign: "center",
      }}>
        <AnimatedSection>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🫒</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: COLORS.white, letterSpacing: "-1px", marginBottom: 14 }}>
              Empieza a comer bien hoy
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16.5, marginBottom: 36, lineHeight: 1.65 }}>
              Únete a miles de personas que cuidan su salud sin renunciar al sabor mediterráneo.
            </p>

            {submitted ? (
              <div style={{
                background: "rgba(255,255,255,0.15)", borderRadius: 14,
                padding: "20px 28px", color: COLORS.white, fontWeight: 700, fontSize: 17,
                border: "1px solid rgba(255,255,255,0.3)",
              }}>
                🎉 ¡Perfecto! Te avisaremos pronto. Bienvenido a Recetario Vital.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  required
                  style={{
                    flex: 1, minWidth: 200, padding: "13px 18px", borderRadius: 10,
                    border: "none", fontSize: 15, outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                  }}
                />
                <button type="submit" style={{
                  background: COLORS.accent, color: COLORS.primaryDark,
                  padding: "13px 26px", borderRadius: 10, border: "none",
                  fontWeight: 800, fontSize: 15, cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 16px rgba(212,160,23,0.35)",
                }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                >
                  Comenzar gratis
                </button>
              </form>
            )}

            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12.5, marginTop: 16 }}>
              Sin tarjeta de crédito · Cancela cuando quieras · 14 días gratis
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: COLORS.primaryDark, color: "rgba(255,255,255,0.7)",
        padding: "48px 24px 32px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "space-between",
            marginBottom: 40, paddingBottom: 36, borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}>
            <div style={{ flex: "1 1 220px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>🫒</span>
                <span style={{ fontWeight: 800, fontSize: 18, color: COLORS.white }}>
                  Recetario <span style={{ color: COLORS.primaryLight }}>Vital</span>
                </span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 260 }}>
                Recetas mediterráneas adaptadas a tu condición médica. Come bien, vive mejor.
              </p>
            </div>

            {[
              {
                title: "Plataforma", links: ["Características", "Recetas", "Planificador", "Lista de compras", "Mi biblioteca"],
              },
              {
                title: "Condiciones", links: ["Diabetes", "Hipertensión", "Colesterol", "Celiaquía", "Más condiciones"],
              },
              {
                title: "Empresa", links: ["Sobre nosotros", "Blog", "Prensa", "Privacidad", "Términos"],
              },
            ].map(col => (
              <div key={col.title} style={{ flex: "1 1 140px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.white, marginBottom: 14, letterSpacing: "0.5px" }}>
                  {col.title}
                </div>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom: 9 }}>
                    {/* TODO: añadir rutas reales a cada enlace del footer */}
                    <a href="#" style={{
                      color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14,
                      transition: "color 0.2s",
                    }}
                      onMouseEnter={e => e.target.style.color = COLORS.white}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
                    >{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13 }}>© 2025 Recetario Vital · Todos los derechos reservados</span>
            <span style={{ fontSize: 13 }}>Hecho con ❤️ para quienes cuidan su salud</span>
          </div>
        </div>
      </footer>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
}