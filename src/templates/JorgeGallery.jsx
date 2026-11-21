import "./JorgeGallery.css";

export default function JorgeGallery() {
  return (
    <div className="jfg-frame">
      <iframe
        src="/custom/jorge-penado-galeria.html"
        title="Galería conmemorativa — Jorge Penado Siancas"
        className="jfg-frame__iframe"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
