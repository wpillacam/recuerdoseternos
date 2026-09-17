import "./Hero.css";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <p className="eyebrow hero__eyebrow">Placas con código QR · Perú</p>

        <h1 className="hero__brand">Recuerdos Eternos</h1>

        <p className="hero__slogan">Memorias Digitales Perpetuas</p>

        <p className="hero__desc">
          Honramos la vida de quienes amaste con un memorial digital que perdura en el tiempo.
          Una placa metálica en la lápida y un código QR bastan para revivir su historia:
          fotografías, biografía, árbol familiar, una vela digital y las palabras de quienes lo
          recuerdan.
        </p>

        <div className="hero__actions">
          <a href="#contacto" className="btn btn-gold">
            Crear un Memorial
          </a>
          <a href="#placas" className="btn btn-outline">
            Ver Placas QR
          </a>
        </div>

        <div className="hero__trust">
          <div>
            <strong>+500</strong>
            <span>Memoriales creados</span>
          </div>
          <div className="hero__trust-divider" />
          <div>
            <strong>25</strong>
            <span>Regiones del Perú</span>
          </div>
          <div className="hero__trust-divider" />
          <div>
            <strong>Para siempre</strong>
            <span>Alojamiento perpetuo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
