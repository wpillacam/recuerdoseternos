import { useLanguage } from "../context/LanguageContext";
import "./Hero.css";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow">{t.hero.eyebrow}</p>

        <h1 className="hero__brand">Recuerdos Eternos</h1>

        <p className="hero__slogan">{t.hero.slogan}</p>

        <p className="hero__desc">{t.hero.desc}</p>

        <div className="hero__actions">
          <a href="#contacto" className="btn btn-gold">
            {t.hero.ctaPrimary}
          </a>
          <a href="#placas" className="btn btn-outline">
            {t.hero.ctaSecondary}
          </a>
        </div>

        <div className="hero__trust">
          <div>
            <strong>{t.hero.stat1n}</strong>
            <span>{t.hero.stat1l}</span>
          </div>
          <div className="hero__trust-divider" />
          <div>
            <strong>{t.hero.stat2n}</strong>
            <span>{t.hero.stat2l}</span>
          </div>
          <div className="hero__trust-divider" />
          <div>
            <strong>{t.hero.stat3n}</strong>
            <span>{t.hero.stat3l}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
