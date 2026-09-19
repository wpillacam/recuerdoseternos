import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import "./ImportantDates.css";

const ICONS = [
  <svg key="aniversario" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="10" width="32" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M8 18h32" stroke="currentColor" strokeWidth="2" />
    <path d="M16 6v8M32 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="29" r="5" stroke="currentColor" strokeWidth="1.8" />
  </svg>,
  <svg key="cumpleanos" viewBox="0 0 48 48" fill="none">
    <path d="M12 22h24v14a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V22Z" stroke="currentColor" strokeWidth="2" />
    <path d="M12 28h24" stroke="currentColor" strokeWidth="1.6" />
    <path d="M18 22v-4a2 2 0 1 1 4 0v4M26 22v-4a2 2 0 1 1 4 0v4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M24 13V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="24" cy="6" r="1.6" fill="currentColor" />
  </svg>,
  <svg key="difuntos" viewBox="0 0 48 48" fill="none">
    <path d="M24 30V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M24 16c-3-3-3-6.5 0-10 3 3.5 3 7 0 10Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <rect x="17" y="30" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M12 39h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  <svg key="personalizada" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 8c-6.5 0-10.5 5-10.5 12v6l-3.5 6h28l-3.5-6v-6c0-7-4-12-10.5-12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M20 36a4 4 0 0 0 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>,
];

export default function ImportantDates() {
  const { t } = useLanguage();

  return (
    <section className="section dates">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{t.dates.eyebrow}</p>
          <h2 className="section-title">{t.dates.title}</h2>
          <p className="section-sub">{t.dates.sub}</p>
        </Reveal>

        <div className="dates__grid">
          {t.dates.items.map((item, i) => (
            <Reveal key={item.title} className="dates__card" delay={i * 90}>
              <div className="dates__icon">{ICONS[i]}</div>
              <h3 className="dates__title">{item.title}</h3>
              <p className="dates__detail">{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
