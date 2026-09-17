import Reveal from "./Reveal";
import "./Catalog.css";

const PLAQUES = [
  {
    id: "rect",
    name: "Placa Rectangular",
    size: "12 x 8 cm",
    tag: "Personalizada",
    shape: "rect",
    cta: "Elegir esta placa",
    features: [
      "Aluminio anodizado con grabado láser",
      "Diseño y texto 100% personalizados",
      "Incluye código QR grabado",
      "Resistente al agua y rayos UV",
    ],
    featured: true,
  },
  {
    id: "square",
    name: "Placa Cuadrada",
    size: "5 x 5 cm",
    tag: "Genérica",
    shape: "square",
    cta: "Elegir esta placa",
    features: [
      "Aluminio grabado con acabado mate",
      "Formato compacto y discreto",
      "Incluye código QR grabado",
      "Ideal para nichos y espacios reducidos",
    ],
    featured: false,
  },
  {
    id: "sticker",
    name: "Adhesivo QR",
    size: "8 x 8 cm",
    tag: "Adhesivo",
    shape: "sticker",
    cta: "Elegir este adhesivo",
    features: [
      "Vinilo resistente a la intemperie y rayos UV",
      "No requiere reemplazar la lápida actual",
      "Incluye código QR de alta duración",
      "Instalación sencilla en minutos",
    ],
    featured: false,
  },
];

export default function Catalog() {
  return (
    <section id="placas" className="section catalog">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Catálogo</p>
          <h2 className="section-title">Placas y adhesivos conmemorativos</h2>
          <p className="section-sub">
            Grabado láser de alta precisión sobre aluminio, o un adhesivo QR si ya tienes una
            lápida y no quieres reemplazarla.
          </p>
        </Reveal>

        <div className="catalog__grid">
          {PLAQUES.map((plaque, i) => (
            <Reveal
              key={plaque.id}
              as="article"
              delay={i * 90}
              className={`plaque-card ${plaque.featured ? "plaque-card--featured" : ""}`}
            >
              {plaque.featured && <span className="plaque-card__badge">Más elegida</span>}

              <div className="plaque-mock">
                <div className={`plaque-mock__metal plaque-mock__metal--${plaque.shape}`}>
                  <div className="plaque-mock__qr">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className="plaque-mock__name">MARÍA E. QUISPE</p>
                  <p className="plaque-mock__dates">1948 — 2024</p>
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
                    className={`btn btn-block ${plaque.featured ? "btn-gold" : "btn-outline"}`}
                  >
                    {plaque.cta}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
