import { useState } from "react";
import logoIcon from "../assets/logo-icon.png";
import { formatDate } from "./dateUtils";
import { loc } from "./localize";
import { toYoutubeEmbed } from "./youtube";
import PhotoLightbox from "./PhotoLightbox";
import "./ClassicLightTemplate.css";

const BASE_TABS = ["bio", "timeline", "vela", "album", "video", "cancion", "arbol", "condolencias"];

export default function ClassicLightTemplate({
  memorial,
  photos,
  events,
  members,
  condolences,
  tab,
  setTab,
  lit,
  speaking,
  shareFeedback,
  condolenceForm,
  setCondolenceForm,
  condolenceSent,
  onLightCandle,
  onCondolenceSubmit,
  onListen,
  onShare,
  lang,
  setLang,
  t,
}) {
  const p = t.preview;
  const mp = t.memorialPage;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const tabs = BASE_TABS.filter((id) => id !== "video" || memorial.video_url).filter(
    (id) => id !== "cancion" || memorial.song_url
  );
  const dateRange = [formatDate(memorial.birth_date), formatDate(memorial.death_date)]
    .filter(Boolean)
    .join(" — ");
  const localizedPhotos = photos.map((photo) => ({ ...photo, caption: loc(photo, "caption", lang) }));

  const renderTab = () => {
    switch (tab) {
      case "bio":
        return (
          <div className="mem-content">
            {"speechSynthesis" in window && memorial.biography && (
              <button
                className={`mem-listen ${speaking ? "mem-listen--active" : ""}`}
                onClick={onListen}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  {speaking ? (
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  ) : (
                    <path d="M4 9v6h4l5 5V4L8 9H4Zm11.5 3a3.5 3.5 0 0 0-2-3.16v6.32A3.5 3.5 0 0 0 15.5 12Z" />
                  )}
                </svg>
                {speaking ? p.stopBio : p.listenBio}
              </button>
            )}
            <p>{loc(memorial, "biography", lang) || mp.noBio}</p>
          </div>
        );
      case "timeline":
        return events.length ? (
          <div className="mem-timeline">
            {events.map((ev) => (
              <div className="mem-timeline__item" key={ev.id}>
                <span className="mem-timeline__year">{ev.year_label}</span>
                <span className="mem-timeline__text">{loc(ev, "description", lang)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mem-empty">{mp.noTimeline}</p>
        );
      case "vela":
        return (
          <div className="mem-candle">
            <div className={`mem-candle__flame-wrap ${lit ? "is-lit" : ""}`}>
              {lit && <div className="mem-candle__glow" />}
              {lit && <div className="mem-candle__flame" />}
              <div className="mem-candle__wick" />
              <div className="mem-candle__body" />
            </div>
            <button className="mem-candle__btn" onClick={onLightCandle} disabled={lit}>
              {lit ? p.candleLit : p.candleLight}
            </button>
            <p className="mem-candle__count">
              <strong>{memorial.candle_count ?? 0}</strong> {p.candleCount}
            </p>
            <p className="mem-candle__note">{p.candleDailyNote}</p>
          </div>
        );
      case "album":
        return localizedPhotos.length ? (
          <div className="mem-grid">
            {localizedPhotos.map((photo, i) => (
              <button
                type="button"
                className="mem-grid__item"
                key={photo.id}
                onClick={() => setLightboxIndex(i)}
                aria-label={photo.caption || mp.noPhotos}
              >
                <img src={photo.url} alt={photo.caption || ""} />
              </button>
            ))}
          </div>
        ) : (
          <p className="mem-empty">{mp.noPhotos}</p>
        );
      case "video":
        return memorial.video_url ? (
          <div className="mem-video">
            <iframe
              src={memorial.video_url}
              title="video-tributo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="mem-empty">{mp.noVideo}</p>
        );
      case "cancion":
        return memorial.song_url ? (
          <div>
            {memorial.song_title && <p className="mem-song-title">{memorial.song_title}</p>}
            <div className="mem-video">
              <iframe
                src={toYoutubeEmbed(memorial.song_url)}
                title="cancion"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <p className="mem-empty">{mp.noSong}</p>
        );
      case "arbol":
        return members.length ? (
          <div className="mem-tree">
            <div className="mem-tree__node mem-tree__node--main">{memorial.full_name}</div>
            <div className="mem-tree__row">
              {members.map((m) => (
                <div className="mem-tree__node" key={m.id}>
                  {m.name}
                  {m.relation && <small> · {loc(m, "relation", lang)}</small>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mem-empty">{mp.noFamily}</p>
        );
      case "condolencias":
        return (
          <div className="mem-condolences">
            <form className="mem-condolence-form" onSubmit={onCondolenceSubmit}>
              <h3>{mp.condolenceFormTitle}</h3>
              <input
                type="text"
                required
                placeholder={mp.condolenceNamePh}
                value={condolenceForm.author_name}
                onChange={(e) => setCondolenceForm((f) => ({ ...f, author_name: e.target.value }))}
              />
              <textarea
                required
                rows={3}
                placeholder={mp.condolenceMessagePh}
                value={condolenceForm.message}
                onChange={(e) => setCondolenceForm((f) => ({ ...f, message: e.target.value }))}
              />
              <button type="submit" className="btn btn-gold">
                {mp.condolenceSubmit}
              </button>
              {condolenceSent && <span className="mem-saved">{mp.condolenceSent}</span>}
            </form>

            {condolences.length ? (
              <div className="mem-notes">
                {condolences.map((note) => (
                  <div className="mem-note" key={note.id}>
                    <strong>{note.author_name}</strong>
                    <p>{note.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mem-empty">{mp.noCondolences}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="memorial-page" style={{ "--tpl-accent": memorial.theme_color || "#c6a664" }}>
      <header className="memorial-page__bar">
        <a href="/" className="memorial-page__brand">
          <img src={logoIcon} alt="Recuerdos Eternos" />
        </a>
        <div className="memorial-page__bar-actions">
          <div className="memorial-page__lang">
            <button
              className={
                lang === "es" ? "memorial-page__lang-btn memorial-page__lang-btn--active" : "memorial-page__lang-btn"
              }
              onClick={() => setLang("es")}
            >
              ES
            </button>
            <button
              className={
                lang === "qu" ? "memorial-page__lang-btn memorial-page__lang-btn--active" : "memorial-page__lang-btn"
              }
              onClick={() => setLang("qu")}
            >
              QU
            </button>
          </div>
          <button className="memorial-page__share" onClick={onShare}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M18 16.08a2.9 2.9 0 0 0-1.94.75l-7.02-4.1a3 3 0 0 0 0-1.46l7.02-4.1A2.9 2.9 0 1 0 15 5c0 .24.04.47.09.7L8.08 9.8a3 3 0 1 0 0 4.4l7.01 4.1a2.9 2.9 0 1 0 2.91-2.22Z" />
            </svg>
            {p.share}
          </button>
        </div>
      </header>

      {shareFeedback && <p className="memorial-page__toast">{p.shareCopied}</p>}

      <div
        className="memorial-page__cover"
        style={memorial.cover_photo_url ? { backgroundImage: `url(${memorial.cover_photo_url})` } : undefined}
      />
      <div className="memorial-page__avatar">
        {memorial.avatar_url && (
          <img src={memorial.avatar_url} alt={memorial.full_name} className="memorial-page__avatar-img" />
        )}
      </div>

      <h1 className="memorial-page__name">{memorial.full_name}</h1>
      {memorial.occupation && <p className="memorial-page__occupation">{loc(memorial, "occupation", lang)}</p>}
      {dateRange && <p className="memorial-page__dates">{dateRange}</p>}
      {memorial.featured_quote && (
        <p className="memorial-page__quote">“{loc(memorial, "featured_quote", lang)}”</p>
      )}
      {memorial.quechua_phrase && <p className="memorial-page__quechua">{memorial.quechua_phrase}</p>}
      <p className="memorial-page__visits">
        👁 {memorial.visit_count ?? 0} {mp.visits}
      </p>

      <nav className="memorial-page__tabs">
        {tabs.map((id) => (
          <button
            key={id}
            className={`memorial-page__tab ${tab === id ? "memorial-page__tab--active" : ""}`}
            onClick={() => setTab(id)}
          >
            {p.tabs[id]}
          </button>
        ))}
      </nav>

      <main className="memorial-page__body">{renderTab()}</main>

      <PhotoLightbox
        photos={localizedPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(dir) => setLightboxIndex((i) => (i + dir + photos.length) % photos.length)}
      />
    </div>
  );
}
