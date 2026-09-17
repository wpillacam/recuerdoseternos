import logoIcon from "../assets/logo-icon.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img className="footer__mark" src={logoIcon} alt="Recuerdos Eternos" />
          <span>Recuerdos Eternos</span>
        </div>

        <p className="footer__tag">Memorias Digitales Perpetuas</p>

        <a
          className="footer__whatsapp"
          href="https://wa.me/51914772762"
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.05-1.33A10 10 0 1 0 12 2Zm0 18.2a8.15 8.15 0 0 1-4.15-1.14l-.3-.18-3 .78.8-2.92-.19-.3A8.19 8.19 0 1 1 12 20.2Zm4.5-6.13c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34 1 2.5.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
          </svg>
          +51 914 772 762
        </a>

        <nav className="footer__links">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#placas">Placas</a>
          <a href="#muestra">Perfil digital</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} Recuerdos Eternos · recuerdoseternos.pe · Ayacucho, Perú
        </p>
      </div>
    </footer>
  );
}
