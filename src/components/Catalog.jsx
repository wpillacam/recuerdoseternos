import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import "./Catalog.css";

const META = {
  rect: { shape: "rect", featured: true, fixedMock: null },
  square: { shape: "square", featured: false, fixedMock: null },
  sticker: { shape: "sticker", featured: false, fixedMock: null },
  mascota: { shape: "pet", featured: false, fixedMock: { name: "ROCKY", dates: "2015 — 2024" } },
};

export default function Catalog() {
  const { t } = useLanguage();
  const c = t.catalog;
  const [customName, setCustomName] = useState("María E. Quispe");
  const [customDates, setCustomDates] = useState("1948 — 2024");

  return (
    <section id="placas" className="section catalog">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="section-title">{c.title}</h2>
          <p className="section-sub">{c.sub}</p>
        </Reveal>

        <Reveal className="customizer">
          <h3 className="customizer__title">{c.customizerTitle}</h3>
          <p className="customizer__sub">{c.customizerSub}</p>
          <div className="customizer__fields">
            <label>
              {c.nameLabel}
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                placeholder={c.namePlaceholder}
                maxLength={28}
              />
            </label>
            <label>
              {c.datesLabel}
              <input
                type="text"
                value={customDates}
                onChange={(e) => setCustomDates(e.target.value)}
                placeholder={c.datesPlaceholder}
                maxLength={20}
              />
            </label>
          </div>
        </Reveal>

        <div className="catalog__grid">
          {c.plaques.map((plaque, i) => {
            const meta = META[plaque.id];
            const mockName = meta.fixedMock ? meta.fixedMock.name : customName.toUpperCase() || "MARÍA E. QUISPE";
            const mockDates = meta.fixedMock ? meta.fixedMock.dates : customDates || "1948 — 2024";

            return (
              <Reveal
                key={plaque.id}
                as="article"
                delay={i * 90}
                className={`plaque-card ${meta.featured ? "plaque-card--featured" : ""}`}
              >
                {meta.featured && <span className="plaque-card__badge">{c.badge}</span>}

                <div className="plaque-mock">
                  <div className={`plaque-mock__metal plaque-mock__metal--${meta.shape}`}>
                    <div className="plaque-mock__qr">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <p className="plaque-mock__name">{mockName}</p>
                    <p className="plaque-mock__dates">{mockDates}</p>
                  </div>
                </div>

                <div className="plaque-card__body">
                  <div className="plaque-card__heading">
                    <h3>{plaque.name}</h3>
                    <span className="plaque-card__tag">{plaque.tag}</span>
                  </div>
                  <p className="plaque-card__size">{plaque.size}</p>

                  <ul className="plaque-card__features">
                    {plaque.features.map((f) => (
                      <li key={f}>
                        <svg viewBox="0 0 20 20" fill="none">
                          <path
                            d="M4 10.5l3.5 3.5L16 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="plaque-card__footer">
                    <a
                      href="#contacto"
                      className={`btn btn-block ${meta.featured ? "btn-gold" : "btn-outline"}`}
                    >
                      {plaque.cta}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
