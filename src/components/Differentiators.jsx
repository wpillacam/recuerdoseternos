import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import "./Differentiators.css";

const ICONS = [
  <svg key="aniversario" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="10" width="32" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M8 18h32" stroke="currentColor" strokeWidth="2" />
    <path d="M16 6v8M32 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M24 30c-4-3-8-5.8-8-9.5A4.5 4.5 0 0 1 24 17a4.5 4.5 0 0 1 8 3.5c0 3.7-4 6.5-8 9.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>,
  <svg key="adhesivo" viewBox="0 0 48 48" fill="none">
    <path
      d="M13 7h16l9 9v21a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V11a4 4 0 0 1 4-4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M29 7v9h9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <rect x="15" y="21" width="6" height="6" stroke="currentColor" strokeWidth="1.6" />
    <rect x="27" y="21" width="6" height="6" stroke="currentColor" strokeWidth="1.6" />
    <rect x="15" y="31" width="6" height="6" stroke="currentColor" strokeWidth="1.6" />
  </svg>,
  <svg key="quechua" viewBox="0 0 48 48" fill="none">
    <path
      d="M7 15a7 7 0 0 1 7-7h9a7 7 0 0 1 7 7v5a7 7 0 0 1-7 7h-8l-6 5v-5.6A7 7 0 0 1 7 20Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M29 18h5a7 7 0 0 1 7 7v3a7 7 0 0 1-7 7v4.2l-5.2-4.2"
      stroke="currentColor"
      strokeWidth="1.8"
      opacity="0.6"
    />
  </svg>,
  <svg key="privacidad" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 5.5 38 11v10c0 10.5-6 16.5-14 21.5-8-5-14-11-14-21.5V11Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect x="19" y="22" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M21 22v-3a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="2" />
  </svg>,
];

export default function Differentiators() {
  const { t } = useLanguage();

  return (
    <section className="section diff">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{t.diff.eyebrow}</p>
          <h2 className="section-title">{t.diff.title}</h2>
          <p className="section-sub">{t.diff.sub}</p>
        </Reveal>

        <div className="diff__grid">
          {t.diff.items.map((item, i) => (
            <Reveal key={item.title} className="diff__card" delay={i * 90}>
              <div className="diff__icon">{ICONS[i]}</div>
              <h3 className="diff__title">{item.title}</h3>
              <p className="diff__detail">{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
