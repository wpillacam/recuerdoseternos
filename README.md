# Recuerdos Eternos

Landing page de **Recuerdos Eternos** — memorias digitales perpetuas para lápidas, mediante placas metálicas con código QR que enlazan a un memorial digital (fotos, biografía, árbol familiar, vela digital y libro de condolencias).

Sitio pensado *mobile-first*, ya que la mayoría de visitantes acceden escaneando el código QR directamente desde el celular.

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- CSS puro (variables CSS, sin frameworks)
- Tipografías: [Cinzel](https://fonts.google.com/specimen/Cinzel), [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) y [Jost](https://fonts.google.com/specimen/Jost) vía Google Fonts

## Estructura

```
src/
  components/    Header, Hero, HowItWorks, Catalog, PhonePreview, Contact, Footer, WhatsappFloat
  assets/        Logo e imágenes propias
  index.css      Variables de tema y estilos globales
public/          favicon, apple-touch-icon
```

## Secciones de la página

- **Hero** — marca, eslogan y llamados a la acción
- **¿Cómo funciona?** — flujo interactivo de 3 pasos
- **Catálogo** — placas rectangular (personalizada) y cuadrada (genérica)
- **Muestra interactiva** — simulación de un perfil de memorial digital en un teléfono, con pestañas de Biografía, Vela digital, Álbum, Árbol familiar y Condolencias
- **Contacto** — formulario y botón directo de WhatsApp

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```
