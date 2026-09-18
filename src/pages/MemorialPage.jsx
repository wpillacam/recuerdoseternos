import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";
import { TEMPLATES } from "../templates";
import logoIcon from "../assets/logo-icon.png";
import "./MemorialPage.css";

export default function MemorialPage() {
  const { uuid } = useParams();
  const { t, lang, setLang } = useLanguage();
  const mp = t.memorialPage;

  const [status, setStatus] = useState("loading");
  const [memorial, setMemorial] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [condolences, setCondolences] = useState([]);
  const [tab, setTab] = useState("bio");
  const [lit, setLit] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
  const [condolenceForm, setCondolenceForm] = useState({ author_name: "", message: "" });
  const [condolenceSent, setCondolenceSent] = useState(false);
  const visitedRef = useRef(false);

  useEffect(() => {
    let active = true;

    async function load() {
      const { data: memorialRow } = await supabase
        .from("memorials")
        .select("*")
        .eq("id", uuid)
        .maybeSingle();

      if (!active) return;
      if (!memorialRow) {
        setStatus("notfound");
        return;
      }
      setMemorial(memorialRow);

      if (memorialRow.template_id === "custom") {
        setStatus("ready");
        if (!visitedRef.current) {
          visitedRef.current = true;
          supabase.rpc("increment_visit", { memorial_id_input: uuid });
        }
        return;
      }

      const [{ data: photoRows }, { data: eventRows }, { data: memberRows }, { data: condolenceRows }] =
        await Promise.all([
          supabase.from("memorial_photos").select("*").eq("memorial_id", uuid).order("sort_order"),
          supabase.from("life_events").select("*").eq("memorial_id", uuid).order("sort_order"),
          supabase.from("family_members").select("*").eq("memorial_id", uuid).order("sort_order"),
          supabase
            .from("condolences")
            .select("*")
            .eq("memorial_id", uuid)
            .order("created_at", { ascending: false }),
        ]);

      if (!active) return;
      setPhotos(photoRows ?? []);
      setEvents(eventRows ?? []);
      setMembers(memberRows ?? []);
      setCondolences(condolenceRows ?? []);
      setStatus("ready");

      if (!visitedRef.current) {
        visitedRef.current = true;
        supabase.rpc("increment_visit", { memorial_id_input: uuid });
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [uuid]);

  const handleLightCandle = async () => {
    if (lit || !memorial) return;
    setLit(true);
    setMemorial((m) => ({ ...m, candle_count: (m.candle_count ?? 0) + 1 }));
    await supabase.rpc("increment_candle", { memorial_id_input: uuid });
  };

  const handleCondolenceSubmit = async (e) => {
    e.preventDefault();
    if (!condolenceForm.author_name || !condolenceForm.message) return;
    const { data } = await supabase
      .from("condolences")
      .insert({
        memorial_id: uuid,
        author_name: condolenceForm.author_name,
        message: condolenceForm.message,
      })
      .select()
      .single();
    if (data) setCondolences((c) => [data, ...c]);
    setCondolenceForm({ author_name: "", message: "" });
    setCondolenceSent(true);
    setTimeout(() => setCondolenceSent(false), 2500);
  };

  const handleListen = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !memorial?.biography) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(memorial.biography);
    utter.lang = lang === "en" ? "en-US" : "es-PE";
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: memorial?.full_name || "Recuerdos Eternos",
      text: memorial?.full_name || "",
      url: window.location.href,
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
      /* user cancelled */
    }
  };

  if (status === "loading") {
    return <div className="route-loading">{mp.loading}</div>;
  }

  if (status === "notfound") {
    return (
      <div className="memorial-notfound">
        <img src={logoIcon} alt="" />
        <h1>{mp.notFoundTitle}</h1>
        <p>{mp.notFoundText}</p>
        <a href="/" className="btn btn-gold">
          {mp.backHome}
        </a>
      </div>
    );
  }

  if (memorial.template_id === "custom" && memorial.custom_html) {
    return (
      <iframe
        title={memorial.full_name}
        srcDoc={memorial.custom_html}
        className="memorial-custom-frame"
      />
    );
  }

  const entry = TEMPLATES[memorial.template_id] || TEMPLATES["classic-light"];
  const Template = entry.Component;

  return (
    <Template
      memorial={memorial}
      photos={photos}
      events={events}
      members={members}
      condolences={condolences}
      tab={tab}
      setTab={setTab}
      lit={lit}
      speaking={speaking}
      shareFeedback={shareFeedback}
      condolenceForm={condolenceForm}
      setCondolenceForm={setCondolenceForm}
      condolenceSent={condolenceSent}
      onLightCandle={handleLightCandle}
      onCondolenceSubmit={handleCondolenceSubmit}
      onListen={handleListen}
      onShare={handleShare}
      lang={lang}
      setLang={setLang}
      t={t}
    />
  );
}
