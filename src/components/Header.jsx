import { useEffect, useState } from "react";
import logoIcon from "../assets/logo-icon.png";
import { useLanguage } from "../context/LanguageContext";
import "./Header.css";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  const LINKS = [
    { href: "#nosotros", label: t.nav.about },
    { href: "#como-funciona", label: t.nav.how },
    { href: "#placas", label: t.nav.plaques },
    { href: "#muestra", label: t.nav.profile },
    { href: "#contacto", label: t.nav.contact },
  ];

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="container header__bar">
        <a href="#inicio" className="header__brand" onClick={closeMenu}>
          <img className="header__mark" src={logoIcon} alt="Recuerdos Eternos" />
          <span className="header__brandtext">Recuerdos Eternos</span>
        </a>

        <nav className={`header__nav ${open ? "header__nav--open" : ""}`}>
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="header__lang" role="group" aria-label="Idioma / Language">
            <button
              className={lang === "es" ? "header__lang-btn header__lang-btn--active" : "header__lang-btn"}
              onClick={() => setLang("es")}
            >
              ES
            </button>
            <button
              className={lang === "en" ? "header__lang-btn header__lang-btn--active" : "header__lang-btn"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>

          <a href="#contacto" className="btn btn-gold header__cta" onClick={closeMenu}>
            {t.nav.cta}
          </a>
        </nav>

        <button
          className={`header__toggle ${open ? "header__toggle--open" : ""}`}
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
