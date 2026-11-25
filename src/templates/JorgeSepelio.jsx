import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PhotoLightbox from "./PhotoLightbox";
import "./JorgeSepelio.css";

// Fotos y videos del sepelio: se muestran todos los archivos de esta carpeta de
// Storage, ordenados por nombre. Para agregar uno basta con subirlo ahí.
const BUCKET = "memorial-media";
const FOLDER = "jorge-penado-siancas/sepelio";
const VIDEO_EXT = /\.(mp4|mov|webm|m4v)$/i;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

export default function JorgeSepelio({ onVideoPlay }) {
  const [media, setMedia] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [view, setView] = useState("fotos");

  useEffect(() => {
    let active = true;
    supabase.storage
      .from(BUCKET)
      .list(FOLDER, { limit: 500, sortBy: { column: "name", order: "asc" } })
      .then(({ data }) => {
        if (!active) return;
        const toUrl = (name) => supabase.storage.from(BUCKET).getPublicUrl(`${FOLDER}/${name}`).data.publicUrl;
        const files = data ?? [];
        setMedia({
          videos: files.filter((f) => VIDEO_EXT.test(f.name)).map((f) => ({ id: f.name, url: toUrl(f.name) })),
          photos: files.filter((f) => IMAGE_EXT.test(f.name)).map((f) => ({ id: f.name, url: toUrl(f.name) })),
        });
      });
    return () => {
      active = false;
    };
  }, []);

  if (!media) return null;

  const { videos, photos } = media;
  const showSwitch = videos.length > 0 && photos.length > 0;
  const current = showSwitch ? view : photos.length ? "fotos" : "video";

  if (!videos.length && !photos.length) {
    return <p className="mem-empty">Pronto compartiremos aquí las fotos y videos de su despedida.</p>;
  }

  return (
    <div className="jsp">
      <p className="jsp__intro">
        El último adiós a Jorge, acompañado del cariño de su familia, amigos y de todos los que lo quisieron.
      </p>

      {showSwitch && (
        <div className="jsp__switch">
          {[
            ["fotos", "Fotos"],
            ["video", videos.length > 1 ? "Videos" : "Video"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`jsp__switch-btn ${current === id ? "jsp__switch-btn--active" : ""}`}
              onClick={() => setView(id)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {current === "video" && (
        <div className="jsp__videos">
          {videos.map((video) => (
            <video key={video.id} className="jsp__video" src={video.url} controls playsInline preload="metadata" onPlay={onVideoPlay} />
          ))}
        </div>
      )}

      {current === "fotos" && (
        <div className="mem-grid">
          {photos.map((photo, i) => (
            <button type="button" className="mem-grid__item" key={photo.id} onClick={() => setLightboxIndex(i)}>
              <img src={photo.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <PhotoLightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(dir) => setLightboxIndex((i) => (i + dir + photos.length) % photos.length)}
      />
    </div>
  );
}
