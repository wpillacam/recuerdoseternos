import { useEffect } from "react";
import "./PhotoLightbox.css";

export default function PhotoLightbox({ photos, index, onClose, onNavigate }) {
  const open = index !== null && index !== undefined;

  useEffect(() => {
    if (!open) return undefined;

    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    }

    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, onNavigate]);

  if (!open) return null;

  const photo = photos[index];
  const hasMultiple = photos.length > 1;

  return (
    <div className="photo-lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="photo-lightbox__close" onClick={onClose} aria-label="Cerrar">
        ×
      </button>

      {hasMultiple && (
        <button
          className="photo-lightbox__nav photo-lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(-1);
          }}
          aria-label="Foto anterior"
        >
          ‹
        </button>
      )}

      <figure className="photo-lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img key={photo.id} src={photo.url} alt={photo.caption || ""} className="photo-lightbox__img" />
        {photo.caption && <figcaption className="photo-lightbox__caption">{photo.caption}</figcaption>}
      </figure>

      {hasMultiple && (
        <button
          className="photo-lightbox__nav photo-lightbox__nav--next"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(1);
          }}
          aria-label="Foto siguiente"
        >
          ›
        </button>
      )}
    </div>
  );
}
