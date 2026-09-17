import { useEffect, useState } from "react";
import logoIcon from "../assets/logo-icon.png";
import "./Header.css";

const LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#placas", label: "Placas" },
  { href: "#muestra", label: "Perfil digital" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

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
          <a href="#contacto" className="btn btn-gold header__cta" onClick={closeMenu}>
            Crear un Memorial
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
