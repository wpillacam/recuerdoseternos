import Reveal from "./Reveal";
import "./Differentiators.css";

const ITEMS = [
  {
    id: "aniversario",
    title: "Recordatorio de aniversario",
    detail:
      "Cada año, en la fecha que elijas, te avisamos por WhatsApp para honrar su memoria junto a tu familia.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="10" width="32" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M8 18h32" stroke="currentColor" strokeWidth="2" />
        <path d="M16 6v8M32 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M24 30c-4-3-8-5.8-8-9.5A4.5 4.5 0 0 1 24 17a4.5 4.5 0 0 1 8 3.5c0 3.7-4 6.5-8 9.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    id: "adhesivo",
    title: "Adhesivo QR para lápidas existentes",
    detail:
      "¿Ya tienes una lápida? No hace falta reemplazarla: nuestro adhesivo QR se coloca sobre cualquier superficie y enlaza al mismo memorial digital.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
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
      </svg>
    ),
  },
  {
    id: "quechua",
    title: "Mensajes en quechua",
    detail:
      "Honra sus raíces con epitafios y frases bilingües en español y quechua, preservando la lengua y la memoria de nuestros ancestros.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
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
      </svg>
    ),
  },
  {
    id: "privacidad",
    title: "Memorial público o privado",
    detail:
      "Tú decides quién puede verlo: público para cualquiera que escanee el código, o privado solo para quienes tengan el enlace familiar.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M24 5.5 38 11v10c0 10.5-6 16.5-14 21.5-8-5-14-11-14-21.5V11Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect x="19" y="22" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M21 22v-3a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function Differentiators() {
  return (
    <section className="section diff">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Por qué elegirnos</p>
          <h2 className="section-title">Lo que nos hace únicos</h2>
          <p className="section-sub">
            Más que una placa: un acompañamiento pensado para tu familia y su cultura.
          </p>
        </Reveal>

        <div className="diff__grid">
          {ITEMS.map((item, i) => (
            <Reveal key={item.id} className="diff__card" delay={i * 90}>
              <div className="diff__icon">{item.icon}</div>
              <h3 className="diff__title">{item.title}</h3>
              <p className="diff__detail">{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
