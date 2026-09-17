import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import "./HowItWorks.css";

const ICONS = [
  <svg key="1" viewBox="0 0 48 48" fill="none">
    <rect x="7" y="14" width="34" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M13 34v4M35 34v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="24" r="4.5" stroke="currentColor" strokeWidth="2" />
    <path d="M13 20h10M13 25h7M13 30h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  <svg key="2" viewBox="0 0 48 48" fill="none">
    <rect x="10" y="6" width="28" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="24" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
    <path d="M15 34c1.5-5 6-7 9-7s7.5 2 9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  <svg key="3" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="28" y="8" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="8" y="28" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="12" y="12" width="4" height="4" fill="currentColor" />
    <rect x="32" y="12" width="4" height="4" fill="currentColor" />
    <rect x="12" y="32" width="4" height="4" fill="currentColor" />
    <path d="M29 29h5v5M40 29v5h-3M34 40h6v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
];

export default function HowItWorks() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const steps = t.how.steps;
  const current = steps[active];

  return (
    <section id="como-funciona" className="section how">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{t.how.eyebrow}</p>
          <h2 className="section-title">{t.how.title}</h2>
          <p className="section-sub">{t.how.sub}</p>
        </Reveal>

        <div className="how__grid">
          <Reveal className="how__steps">
            {steps.map((step, i) => (
              <button
                key={step.title}
                className={`how__step ${active === i ? "how__step--active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="how__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="how__step-text">
                  <span className="how__step-title">{step.title}</span>
                  {active === i && <span className="how__step-detail">{step.detail}</span>}
                </span>
                <span className="how__chevron" aria-hidden="true">
                  {active === i ? "—" : "+"}
                </span>
              </button>
            ))}
          </Reveal>

          <Reveal className="how__display" delay={120}>
            <div className="how__icon">{ICONS[active]}</div>
            <h3 className="how__display-title">{current.title}</h3>
            <p className="how__display-detail">{current.detail}</p>
            <div className="how__dots">
              {steps.map((step, i) => (
                <span key={step.title} className={`how__dot ${active === i ? "how__dot--active" : ""}`} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
