import { useState } from "react";
import Reveal from "./Reveal";
import "./PhonePreview.css";

function DigitalCandleDemo() {
  const [lit, setLit] = useState(false);
  const [count, setCount] = useState(128);

  const handleLight = () => {
    if (lit) return;
    setLit(true);
    setCount((c) => c + 1);
  };

  return (
    <div className="phone-candle">
      <div className={`phone-candle__flame-wrap ${lit ? "is-lit" : ""}`}>
        {lit && <div className="phone-candle__glow" />}
        {lit && <div className="phone-candle__flame" />}
        <div className="phone-candle__wick" />
        <div className="phone-candle__body" />
      </div>

      <button className="phone-candle__btn" onClick={handleLight} disabled={lit}>
        {lit ? "Vela encendida" : "Encender una vela"}
      </button>

      <p className="phone-candle__count">
        <strong>{count}</strong> velas encendidas en su memoria
      </p>
    </div>
  );
}

const PHOTO_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="m4 17 5-4.5 3 2.5 4-4.5 4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TABS = [
  {
    id: "bio",
    label: "Biografía",
    content: (
      <div className="phone-content">
        <p>
          María Elena nació en Huamanga en 1948. Maestra rural por más de 30 años, dedicó su
          vida a la educación de niños en comunidades altoandinas. Amante del tejido, la
          chicha morada y las tardes de domingo en familia.
        </p>
        <p>
          Deja un legado de cariño, disciplina y fe que sigue vivo en cada uno de sus nietos.
        </p>
      </div>
    ),
  },
  {
    id: "vela",
    label: "Vela digital",
    content: <DigitalCandleDemo />,
  },
  {
    id: "album",
    label: "Álbum",
    content: (
      <div className="phone-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="phone-grid__item" key={i}>
            {PHOTO_ICON}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "arbol",
    label: "Árbol familiar",
    content: (
      <div className="phone-tree">
        <div className="phone-tree__node phone-tree__node--main">María E.</div>
        <div className="phone-tree__row">
          <div className="phone-tree__node">Rosa</div>
          <div className="phone-tree__node">Jorge</div>
          <div className="phone-tree__node">Ana</div>
        </div>
      </div>
    ),
  },
  {
    id: "condolencias",
    label: "Condolencias",
    content: (
      <div className="phone-notes">
        <div className="phone-note">
          <strong>Rosa Q.</strong>
          <p>“Siempre en nuestros corazones, mamá. Gracias por tanto amor.”</p>
        </div>
        <div className="phone-note">
          <strong>Jorge Q.</strong>
          <p>“Tu ejemplo nos sigue guiando cada día.”</p>
        </div>
      </div>
    ),
  },
];

export default function PhonePreview() {
  const [tab, setTab] = useState("bio");
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <section id="muestra" className="section preview">
      <div className="container preview__inner">
        <Reveal className="preview__text">
          <p className="eyebrow">Muestra interactiva</p>
          <h2 className="section-title">Así luce un memorial digital</h2>
          <p className="section-sub preview__desc">
            Al escanear el código QR de la placa, cualquier visitante accede a un perfil completo
            y emotivo, donde también puede encender una vela digital en su memoria. Prueba las
            pestañas del ejemplo.
          </p>

          <div className="preview__tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`preview__tab ${tab === t.id ? "preview__tab--active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <p className="preview__privacy-note">
            Tú decides quién puede verlo: prueba a marcar el memorial como{" "}
            <strong>privado</strong> en el ejemplo.
          </p>
        </Reveal>

        <Reveal className="preview__phone-wrap" delay={120}>
          <div className="phone">
            <div className="phone__notch" />
            <div className="phone__screen">
              <div className="phone__cover" />
              <div className="phone__avatar" />
              <p className="phone__name">María Elena Quispe</p>
              <p className="phone__dates">15 mar 1948 — 02 ene 2024</p>
              <p className="phone__quechua">
                “Kawsayninpi wiñaypaq” · vive para siempre en nuestra memoria
              </p>

              <button
                type="button"
                className={`phone__privacy ${isPrivate ? "phone__privacy--private" : ""}`}
                onClick={() => setIsPrivate((v) => !v)}
                aria-pressed={isPrivate}
              >
                <span className="phone__privacy-track">
                  <span className="phone__privacy-knob" />
                </span>
                {isPrivate ? "Memorial privado" : "Memorial público"}
              </button>

              <div className="phone__nav">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    className={`phone__nav-btn ${tab === t.id ? "phone__nav-btn--active" : ""}`}
                    onClick={() => setTab(t.id)}
                    disabled={isPrivate}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="phone__body">
                {isPrivate ? (
                  <div className="phone-private">
                    <svg viewBox="0 0 48 48" fill="none">
                      <rect
                        x="12"
                        y="22"
                        width="24"
                        height="18"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 22v-6a8 8 0 0 1 16 0v6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <p>
                      Este memorial es privado.
                      <br />
                      Solo familiares con el enlace pueden verlo.
                    </p>
                  </div>
                ) : (
                  TABS.find((t) => t.id === tab).content
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
