import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import "./About.css";

const ICONS = [
  <svg key="memory" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 40c-4-3-15-11-15-21a9 9 0 0 1 15-6.7A9 9 0 0 1 39 19c0 10-11 18-15 21Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>,
  <svg key="culture" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 6 8 14v6c0 11 6.5 18.5 16 22 9.5-3.5 16-11 16-22v-6L24 6Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M24 16v16M17 20l14 8M31 20l-14 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  <svg key="tech" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="26" y="8" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="8" y="26" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M31 31h9v9h-9zM31 31v9M40 31v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="section about">
      <div className="container about__inner">
        <Reveal className="about__text">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="section-title">{t.about.title}</h2>

          <div className="about__word">
            <span className="about__word-main">{t.about.wordLabel}</span>
            <span className="about__word-meaning">{t.about.wordMeaning}</span>
          </div>

          <p className="about__p">{t.about.p1}</p>
          <p className="about__p">{t.about.p2}</p>
        </Reveal>

        <div className="about__pillars">
          {t.about.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} className="about__pillar" delay={i * 100}>
              <div className="about__pillar-icon">{ICONS[i]}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
