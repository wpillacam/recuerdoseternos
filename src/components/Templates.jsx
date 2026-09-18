import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import { TEMPLATES } from "../templates";
import "./Templates.css";

const SWATCHES = ["#c6a664", "#d4af37", "#8fb3e0", "#e0a3b0", "#7fc9a0"];

export default function Templates() {
  const { t } = useLanguage();
  const tp = t.templates;
  const [lightColor, setLightColor] = useState(TEMPLATES["classic-light"].defaultColor);
  const [darkColor, setDarkColor] = useState(TEMPLATES["classic-dark"].defaultColor);

  return (
    <section id="plantillas" className="section templates">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{tp.eyebrow}</p>
          <h2 className="section-title">{tp.title}</h2>
          <p className="section-sub">{tp.sub}</p>
        </Reveal>

        <div className="templates__grid">
          <Reveal className="template-card">
            <div className="tmock tmock--light" style={{ "--mockup-accent": lightColor }}>
              <div className="tmock-light__avatar" />
              <p className="tmock-light__name">María E. Quispe</p>
              <p className="tmock-light__dates">1948 — 2024</p>
              <div className="tmock-light__tabs">
                <span className="tmock-pill tmock-pill--active">Biografía</span>
                <span className="tmock-pill">Vela</span>
                <span className="tmock-pill">Álbum</span>
              </div>
            </div>
            <h3>{tp.lightLabel}</h3>
            <p>{tp.lightDesc}</p>
            <div className="template-card__swatches">
              {SWATCHES.map((c) => (
                <button
                  key={c}
                  className={`template-swatch ${lightColor === c ? "template-swatch--active" : ""}`}
                  style={{ background: c }}
                  onClick={() => setLightColor(c)}
                  aria-label={c}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="template-card" delay={90}>
            <div className="tmock tmock--dark" style={{ "--mockup-accent": darkColor }}>
              <div className="tmock-dark__hero" />
              <div className="tmock-dark__avatar" />
              <p className="tmock-dark__name">María E. Quispe</p>
              <p className="tmock-dark__sub">Maestra rural</p>
              <div className="tmock-dark__divider" />
              <div className="tmock-dark__tabs">
                <span className="tmock-pill tmock-pill--dark-active">Biografía</span>
                <span className="tmock-pill tmock-pill--dark">Vela</span>
                <span className="tmock-pill tmock-pill--dark">Álbum</span>
              </div>
            </div>
            <h3>{tp.darkLabel}</h3>
            <p>{tp.darkDesc}</p>
            <div className="template-card__swatches">
              {SWATCHES.map((c) => (
                <button
                  key={c}
                  className={`template-swatch ${darkColor === c ? "template-swatch--active" : ""}`}
                  style={{ background: c }}
                  onClick={() => setDarkColor(c)}
                  aria-label={c}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="template-card template-card--custom" delay={180}>
            <div className="template-card__custom-icon">
              <svg viewBox="0 0 48 48" fill="none">
                <path
                  d="M10 38 32 16l6 6-22 22H10v-6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M28 20l6 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3>{tp.customTitle}</h3>
            <p>{tp.customDesc}</p>
            <a
              className="btn btn-gold"
              href="https://wa.me/51914772762"
              target="_blank"
              rel="noreferrer"
            >
              {tp.customCta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
