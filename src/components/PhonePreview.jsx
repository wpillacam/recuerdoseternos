import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import "./PhonePreview.css";

function DigitalCandleDemo({ lightLabel, litLabel, countLabel }) {
  const [lit, setLit] = useState(false);
  const [count, setCount] = useState(128);

  const handleLight = () => {
    if (lit) return;
    setLit(true);
    setCount((c) => c + 1);
  };

  return (
    <div className="phone-candle">
      <div className={`phone-candle__flame-wrap ${lit ? "is-lit" : ""}`}>
        {lit && <div className="phone-candle__glow" />}
        {lit && <div className="phone-candle__flame" />}
        <div className="phone-candle__wick" />
        <div className="phone-candle__body" />
      </div>

      <button className="phone-candle__btn" onClick={handleLight} disabled={lit}>
        {lit ? litLabel : lightLabel}
      </button>

      <p className="phone-candle__count">
        <strong>{count}</strong> {countLabel}
      </p>
    </div>
  );
}

const PHOTO_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="m4 17 5-4.5 3 2.5 4-4.5 4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TAB_IDS = ["bio", "timeline", "vela", "album", "video", "arbol", "condolencias"];

export default function PhonePreview() {
  const { t, lang } = useLanguage();
  const p = t.preview;
  const [tab, setTab] = useState("bio");
  const [isPrivate, setIsPrivate] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  const handleListen = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(p.bio.join(" "));
    utter.lang = lang === "en" ? "en-US" : "es-PE";
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Recuerdos Eternos",
      text: "María Elena Quispe — Recuerdos Eternos",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(shareData.url);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    } catch {
      /* user cancelled share or clipboard unavailable */
    }
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case "bio":
        return (
          <div className="phone-content">
            {"speechSynthesis" in window && (
              <button
                className={`phone-content__listen ${speaking ? "phone-content__listen--active" : ""}`}
                onClick={handleListen}
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
            {p.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        );
      case "timeline":
        return (
          <div className="phone-timeline">
            {p.timeline.map((item) => (
              <div className="phone-timeline__item" key={item.year + item.text}>
                <span className="phone-timeline__year">{item.year}</span>
                <span className="phone-timeline__text">{item.text}</span>
              </div>
            ))}
          </div>
        );
      case "vela":
        return (
          <DigitalCandleDemo
            lightLabel={p.candleLight}
            litLabel={p.candleLit}
            countLabel={p.candleCount}
          />
        );
      case "album":
        return (
          <div className="phone-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="phone-grid__item" key={i}>
                {PHOTO_ICON}
              </div>
            ))}
          </div>
        );
      case "video":
        return (
          <div className="phone-video">
            <div className="phone-video__frame">
              <div className="phone-video__play">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M8 5v14l11-7Z" />
                </svg>
              </div>
            </div>
            <p className="phone-video__caption">{p.videoCaption}</p>
          </div>
        );
      case "arbol":
        return (
          <div className="phone-tree">
            <div className="phone-tree__node phone-tree__node--main">{p.treeMain}</div>
            <div className="phone-tree__row">
              {p.treeChildren.map((name) => (
                <div className="phone-tree__node" key={name}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        );
      case "condolencias":
        return (
          <div className="phone-notes">
            {p.notes.map((note) => (
              <div className="phone-note" key={note.name}>
                <strong>{note.name}</strong>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="muestra" className="section preview">
      <div className="container preview__inner">
        <Reveal className="preview__text">
          <p className="eyebrow">{p.eyebrow}</p>
          <h2 className="section-title">{p.title}</h2>
          <p className="section-sub preview__desc">{p.desc}</p>

          <div className="preview__tabs">
            {TAB_IDS.map((id) => (
              <button
                key={id}
                className={`preview__tab ${tab === id ? "preview__tab--active" : ""}`}
                onClick={() => setTab(id)}
              >
                {p.tabs[id]}
              </button>
            ))}
          </div>

          <p className="preview__privacy-note">
            {p.privacyNote} <strong>{p.privacyNoteStrong}</strong> {p.privacyNoteEnd}
          </p>
        </Reveal>

        <Reveal className="preview__phone-wrap" delay={120}>
          <div className="phone">
            <div className="phone__notch" />
            <div className="phone__screen">
              <div className="phone__cover" />
              <div className="phone__avatar" />
              <p className="phone__name">María Elena Quispe</p>
              <p className="phone__dates">15 mar 1948 — 02 ene 2024</p>
              <p className="phone__quechua">{p.quechuaPhrase}</p>

              <p className="phone__stats">👁 1,842 {p.visits}</p>

              <button
                type="button"
                className={`phone__privacy ${isPrivate ? "phone__privacy--private" : ""}`}
                onClick={() => setIsPrivate((v) => !v)}
                aria-pressed={isPrivate}
              >
                <span className="phone__privacy-track">
                  <span className="phone__privacy-knob" />
                </span>
                {isPrivate ? p.privateLabel : p.publicLabel}
              </button>

              <div className="phone__toolbar">
                <button
                  className={`phone__toolbar-btn ${musicOn ? "phone__toolbar-btn--active" : ""}`}
                  onClick={() => setMusicOn((v) => !v)}
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  {musicOn ? p.musicOn : p.musicOff}
                </button>
                <button className="phone__toolbar-btn" onClick={handleShare}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M18 16.08a2.9 2.9 0 0 0-1.94.75l-7.02-4.1a3 3 0 0 0 0-1.46l7.02-4.1A2.9 2.9 0 1 0 15 5c0 .24.04.47.09.7L8.08 9.8a3 3 0 1 0 0 4.4l7.01 4.1a2.9 2.9 0 1 0 2.91-2.22Z" />
                  </svg>
                  {p.share}
                </button>
              </div>

              {shareFeedback && <p className="phone__toast">{p.shareCopied}</p>}
              {musicOn && (
                <p className="phone__now-playing">
                  <span className="eq-bars">
                    <span />
                    <span />
                    <span />
                  </span>
                  {p.nowPlaying}
                </p>
              )}

              <div className="phone__nav">
                {TAB_IDS.map((id) => (
                  <button
                    key={id}
                    className={`phone__nav-btn ${tab === id ? "phone__nav-btn--active" : ""}`}
                    onClick={() => setTab(id)}
                    disabled={isPrivate}
                  >
                    {p.tabs[id]}
                  </button>
                ))}
              </div>

              <div className="phone__body">
                {isPrivate ? (
                  <div className="phone-private">
                    <svg viewBox="0 0 48 48" fill="none">
                      <rect
                        x="12"
                        y="22"
                        width="24"
                        height="18"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M16 22v-6a8 8 0 0 1 16 0v6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <p>
                      {p.privateOverlay1}
                      <br />
                      {p.privateOverlay2}
                    </p>
                  </div>
                ) : (
                  renderTabContent(tab)
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
