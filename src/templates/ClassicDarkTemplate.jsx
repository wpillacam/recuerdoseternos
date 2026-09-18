import logoIcon from "../assets/logo-icon.png";
import { formatDate } from "./dateUtils";
import "./ClassicDarkTemplate.css";

const BASE_TABS = ["bio", "timeline", "vela", "album", "video", "arbol", "condolencias"];

export default function ClassicDarkTemplate({
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

  const tabs = BASE_TABS.filter((id) => id !== "video" || memorial.video_url);
  const dateRange = [formatDate(memorial.birth_date, lang), formatDate(memorial.death_date, lang)]
    .filter(Boolean)
    .join(" — ");

  const renderTab = () => {
    switch (tab) {
      case "bio":
        return (
          <div className="tpld-content">
            {"speechSynthesis" in window && memorial.biography && (
              <button className={`tpld-listen ${speaking ? "tpld-listen--active" : ""}`} onClick={onListen}>
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
            <p>{memorial.biography || mp.noBio}</p>
          </div>
        );
      case "timeline":
        return events.length ? (
          <div className="tpld-timeline">
            {events.map((ev) => (
              <div className="tpld-timeline__item" key={ev.id}>
                <span className="tpld-timeline__year">{ev.year_label}</span>
                <span className="tpld-timeline__text">{ev.description}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="tpld-empty">{mp.noTimeline}</p>
        );
      case "vela":
        return (
          <div className="tpld-candle-card">
            <div className={`tpld-candle-holder ${lit ? "is-lit" : ""}`}>
              {lit && <div className="tpld-flame" />}
              <div className="tpld-wick" />
              <div className="tpld-candle-body" />
            </div>
            <p className="tpld-candle-caption">
              <strong>{memorial.candle_count ?? 0}</strong> {p.candleCount}
            </p>
            <button className="tpld-btn-gold" onClick={onLightCandle} disabled={lit}>
              🕯️ {lit ? p.candleLit : p.candleLight}
            </button>
          </div>
        );
      case "album":
        return photos.length ? (
          <div className="tpld-gallery">
            {photos.map((photo) => (
              <img key={photo.id} src={photo.url} alt={photo.caption || ""} />
            ))}
          </div>
        ) : (
          <p className="tpld-empty">{mp.noPhotos}</p>
        );
      case "video":
        return memorial.video_url ? (
          <div className="tpld-video">
            <iframe
              src={memorial.video_url}
              title="video-tributo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="tpld-empty">{mp.noVideo}</p>
        );
      case "arbol":
        return members.length ? (
          <div className="tpld-tree">
            <div className="tpld-tree__node tpld-tree__node--main">{memorial.full_name}</div>
            <div className="tpld-tree__row">
              {members.map((m) => (
                <div className="tpld-tree__node" key={m.id}>
                  {m.name}
                  {m.relation && <small> · {m.relation}</small>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="tpld-empty">{mp.noFamily}</p>
        );
      case "condolencias":
        return (
          <div className="tpld-guestbook">
            <input
              type="text"
              className="tpld-input"
              placeholder={mp.condolenceNamePh}
              value={condolenceForm.author_name}
              onChange={(e) => setCondolenceForm((f) => ({ ...f, author_name: e.target.value }))}
            />
            <textarea
              className="tpld-input"
              rows={3}
              placeholder={mp.condolenceMessagePh}
              value={condolenceForm.message}
              onChange={(e) => setCondolenceForm((f) => ({ ...f, message: e.target.value }))}
            />
            <button className="tpld-btn-gold tpld-btn-block" onClick={onCondolenceSubmit}>
              {mp.condolenceSubmit}
            </button>
            {condolenceSent && <span className="tpld-saved">{mp.condolenceSent}</span>}

            {condolences.length ? (
              <div className="tpld-comment-list">
                {condolences.map((note) => (
                  <div className="tpld-comment-item" key={note.id}>
                    <div className="tpld-comment-author">{note.author_name}</div>
                    <div>{note.message}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="tpld-empty">{mp.noCondolences}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tpld" style={{ "--tpl-accent": memorial.theme_color || "#d4af37" }}>
      <header className="tpld-bar">
        <a href="/" className="tpld-brand">
          <img src={logoIcon} alt="Recuerdos Eternos" />
        </a>
        <div className="tpld-bar-actions">
          <div className="tpld-lang">
            <button
              className={lang === "es" ? "tpld-lang-btn tpld-lang-btn--active" : "tpld-lang-btn"}
              onClick={() => setLang("es")}
            >
              ES
            </button>
            <button
              className={lang === "en" ? "tpld-lang-btn tpld-lang-btn--active" : "tpld-lang-btn"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
          <button className="tpld-share" onClick={onShare}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M18 16.08a2.9 2.9 0 0 0-1.94.75l-7.02-4.1a3 3 0 0 0 0-1.46l7.02-4.1A2.9 2.9 0 1 0 15 5c0 .24.04.47.09.7L8.08 9.8a3 3 0 1 0 0 4.4l7.01 4.1a2.9 2.9 0 1 0 2.91-2.22Z" />
            </svg>
            {p.share}
          </button>
        </div>
      </header>

      {shareFeedback && <p className="tpld-toast">{p.shareCopied}</p>}

      <div className="tpld-container">
        <div
          className="tpld-hero"
          style={memorial.cover_photo_url ? { backgroundImage: `url(${memorial.cover_photo_url})` } : undefined}
        />

        <div className="tpld-profile">
          <div className="tpld-profile-frame">
            {memorial.avatar_url ? (
              <img src={memorial.avatar_url} alt={memorial.full_name} className="tpld-profile-img" />
            ) : (
              <div className="tpld-profile-placeholder" />
            )}
          </div>
          <h1 className="tpld-title">{memorial.full_name}</h1>
          {memorial.occupation && <p className="tpld-subtitle">{memorial.occupation}</p>}
          {dateRange && <p className="tpld-dates">{dateRange}</p>}
          <div className="tpld-divider" />
          {memorial.featured_quote && <p className="tpld-quote">“{memorial.featured_quote}”</p>}
          {memorial.quechua_phrase && <p className="tpld-quechua">{memorial.quechua_phrase}</p>}
          <p className="tpld-visits">
            👁 {memorial.visit_count ?? 0} {mp.visits}
          </p>
        </div>

        <nav className="tpld-tabs">
          {tabs.map((id) => (
            <button
              key={id}
              className={`tpld-tab ${tab === id ? "tpld-tab--active" : ""}`}
              onClick={() => setTab(id)}
            >
              {p.tabs[id]}
            </button>
          ))}
        </nav>

        <div className="tpld-section">
          <h2 className="tpld-section-header">{p.tabs[tab]}</h2>
          {renderTab()}
        </div>

        <div className="tpld-footer">
          <p>Memorial Digital Perpetuo</p>
          <p className="tpld-footer-sub">Recuerdos Eternos · Perú</p>
        </div>
      </div>
    </div>
  );
}
