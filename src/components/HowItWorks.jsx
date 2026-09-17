import { useState } from "react";
import Reveal from "./Reveal";
import "./HowItWorks.css";

const STEPS = [
  {
    id: 1,
    title: "Elige tu placa metálica",
    detail:
      "Selecciona entre placas de aluminio con grabado láser: rectangular personalizada (12x8 cm) o cuadrada genérica (5x5 cm). Resistentes a la intemperie, pensadas para durar generaciones.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="7" y="14" width="34" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M13 34v4M35 34v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="24" r="4.5" stroke="currentColor" strokeWidth="2" />
        <path d="M13 20h10M13 25h7M13 30h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Personaliza el perfil digital",
    detail:
      "Sube fotografías y videos, escribe su biografía, construye el árbol familiar, enciende una vela digital y habilita el libro de condolencias para que familiares y amigos dejen sus mensajes.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="10" y="6" width="28" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M15 34c1.5-5 6-7 9-7s7.5 2 9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Escanea para recordar siempre",
    detail:
      "En la lápida, cualquier persona puede escanear el código QR de la placa con su celular y acceder al instante al memorial digital, para siempre.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="28" y="8" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="8" y="28" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <rect x="12" y="12" width="4" height="4" fill="currentColor" />
        <rect x="32" y="12" width="4" height="4" fill="currentColor" />
        <rect x="12" y="32" width="4" height="4" fill="currentColor" />
        <path d="M29 29h5v5M40 29v5h-3M34 40h6v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(1);
  const current = STEPS.find((s) => s.id === active);

  return (
    <section id="como-funciona" className="section how">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Proceso simple</p>
          <h2 className="section-title">¿Cómo funciona?</h2>
          <p className="section-sub">Tres pasos para crear un homenaje que trasciende el tiempo.</p>
        </Reveal>

        <div className="how__grid">
          <Reveal className="how__steps">
            {STEPS.map((step) => (
              <button
                key={step.id}
                className={`how__step ${active === step.id ? "how__step--active" : ""}`}
                onClick={() => setActive(step.id)}
              >
                <span className="how__num">{String(step.id).padStart(2, "0")}</span>
                <span className="how__step-text">
                  <span className="how__step-title">{step.title}</span>
                  {active === step.id && <span className="how__step-detail">{step.detail}</span>}
                </span>
                <span className="how__chevron" aria-hidden="true">
                  {active === step.id ? "—" : "+"}
                </span>
              </button>
            ))}
          </Reveal>

          <Reveal className="how__display" delay={120}>
            <div className="how__icon">{current.icon}</div>
            <h3 className="how__display-title">{current.title}</h3>
            <p className="how__display-detail">{current.detail}</p>
            <div className="how__dots">
              {STEPS.map((step) => (
                <span
                  key={step.id}
                  className={`how__dot ${active === step.id ? "how__dot--active" : ""}`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
