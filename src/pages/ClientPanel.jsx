import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import logoIcon from "../assets/logo-icon.png";
import "./ClientPanel.css";

const emptyEvent = () => ({ id: crypto.randomUUID(), year_label: "", description: "" });
const emptyMember = () => ({ id: crypto.randomUUID(), name: "", relation: "" });

export default function ClientPanel() {
  const { user, isAdmin, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [memorial, setMemorial] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    let active = true;

    async function load() {
      const { data: memorialRow } = await supabase
        .from("memorials")
        .select("*")
        .eq("owner_id", user.id)
        .maybeSingle();

      if (!active) return;

      if (!memorialRow) {
        setLoading(false);
        return;
      }

      setMemorial(memorialRow);

      const [{ data: photoRows }, { data: eventRows }, { data: memberRows }] = await Promise.all([
        supabase
          .from("memorial_photos")
          .select("*")
          .eq("memorial_id", memorialRow.id)
          .order("sort_order"),
        supabase
          .from("life_events")
          .select("*")
          .eq("memorial_id", memorialRow.id)
          .order("sort_order"),
        supabase
          .from("family_members")
          .select("*")
          .eq("memorial_id", memorialRow.id)
          .order("sort_order"),
      ]);

      if (!active) return;
      setPhotos(photoRows ?? []);
      setEvents(eventRows?.length ? eventRows : [emptyEvent()]);
      setMembers(memberRows?.length ? memberRows : [emptyMember()]);
      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, [user]);

  const updateField = (field, value) => {
    setMemorial((m) => ({ ...m, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!memorial) return;
    setSaving(true);
    setSaved(false);

    await supabase
      .from("memorials")
      .update({
        full_name: memorial.full_name,
        birth_date: memorial.birth_date || null,
        death_date: memorial.death_date || null,
        quechua_phrase: memorial.quechua_phrase,
        biography: memorial.biography,
        video_url: memorial.video_url,
        is_public: memorial.is_public,
      })
      .eq("id", memorial.id);

    await supabase.from("life_events").delete().eq("memorial_id", memorial.id);
    const cleanEvents = events.filter((ev) => ev.year_label || ev.description);
    if (cleanEvents.length) {
      await supabase.from("life_events").insert(
        cleanEvents.map((ev, i) => ({
          memorial_id: memorial.id,
          year_label: ev.year_label,
          description: ev.description,
          sort_order: i,
        }))
      );
    }

    await supabase.from("family_members").delete().eq("memorial_id", memorial.id);
    const cleanMembers = members.filter((m) => m.name);
    if (cleanMembers.length) {
      await supabase.from("family_members").insert(
        cleanMembers.map((m, i) => ({
          memorial_id: memorial.id,
          name: m.name,
          relation: m.relation,
          sort_order: i,
        }))
      );
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !memorial) return;
    setUploadError("");
    setUploading(true);

    const path = `${memorial.id}/${crypto.randomUUID()}-${file.name}`;
    const { error: uploadErr } = await supabase.storage.from("memorial-media").upload(path, file);

    if (uploadErr) {
      setUploadError("No se pudo subir la foto. Intenta de nuevo.");
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("memorial-media").getPublicUrl(path);

    const { data: photoRow } = await supabase
      .from("memorial_photos")
      .insert({
        memorial_id: memorial.id,
        url: publicUrlData.publicUrl,
        sort_order: photos.length,
      })
      .select()
      .single();

    if (photoRow) setPhotos((p) => [...p, photoRow]);
    setUploading(false);
    e.target.value = "";
  };

  const handleDeletePhoto = async (photoId) => {
    await supabase.from("memorial_photos").delete().eq("id", photoId);
    setPhotos((p) => p.filter((ph) => ph.id !== photoId));
  };

  if (loading) {
    return <div className="route-loading">Cargando tu memorial…</div>;
  }

  const panelHeader = (
    <header className="panel__header">
      <a href="/" className="panel__brand">
        <img src={logoIcon} alt="Recuerdos Eternos" />
        <span>Recuerdos Eternos</span>
      </a>
      <div className="panel__header-actions">
        {isAdmin && (
          <Link to="/admin" className="btn btn-outline">
            Panel admin
          </Link>
        )}
        <button className="btn btn-outline" onClick={signOut}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );

  if (!memorial) {
    return (
      <div className="panel">
        {panelHeader}
        <div className="panel__empty">
          {isAdmin ? (
            <>
              <p>Esta cuenta de administrador no tiene un memorial propio (es normal).</p>
              <p>Ve al panel admin para crear el memorial de un cliente nuevo.</p>
              <Link to="/admin" className="btn btn-gold">
                Ir al panel admin
              </Link>
            </>
          ) : (
            <>
              <p>Aún no tienes un memorial asignado a tu cuenta.</p>
              <p>Escríbenos por WhatsApp para activarlo.</p>
            </>
          )}
        </div>
      </div>
    );
  }

  const publicUrl = `${window.location.origin}/${memorial.id}`;

  return (
    <div className="panel">
      {panelHeader}

      <div className="container panel__body">
        <div className="panel__link">
          <span>Enlace del memorial (el mismo que va en el código QR):</span>
          <a href={publicUrl} target="_blank" rel="noreferrer">
            {publicUrl}
          </a>
        </div>

        <form className="panel__form" onSubmit={handleSave}>
          <section className="panel__section">
            <h2>Datos principales</h2>
            <div className="panel__grid">
              <label>
                Nombre completo
                <input
                  type="text"
                  value={memorial.full_name ?? ""}
                  onChange={(e) => updateField("full_name", e.target.value)}
                  required
                />
              </label>
              <label>
                Fecha de nacimiento
                <input
                  type="date"
                  value={memorial.birth_date ?? ""}
                  onChange={(e) => updateField("birth_date", e.target.value)}
                />
              </label>
              <label>
                Fecha de fallecimiento
                <input
                  type="date"
                  value={memorial.death_date ?? ""}
                  onChange={(e) => updateField("death_date", e.target.value)}
                />
              </label>
              <label>
                Frase en quechua (opcional)
                <input
                  type="text"
                  value={memorial.quechua_phrase ?? ""}
                  onChange={(e) => updateField("quechua_phrase", e.target.value)}
                  placeholder='Ej. "Kawsayninpi wiñaypaq"'
                />
              </label>
            </div>

            <label>
              Biografía / semblanza
              <textarea
                rows={6}
                value={memorial.biography ?? ""}
                onChange={(e) => updateField("biography", e.target.value)}
                placeholder="Cuenta su historia..."
              />
            </label>

            <label>
              Enlace del video-tributo (YouTube, Google Drive, etc.)
              <input
                type="text"
                value={memorial.video_url ?? ""}
                onChange={(e) => updateField("video_url", e.target.value)}
                placeholder="https://..."
              />
            </label>

            <label className="panel__toggle">
              <input
                type="checkbox"
                checked={memorial.is_public}
                onChange={(e) => updateField("is_public", e.target.checked)}
              />
              Memorial público (si lo desmarcas, solo quienes tengan el enlace directo podrán
              verlo)
            </label>
          </section>

          <section className="panel__section">
            <h2>Línea de vida</h2>
            {events.map((ev, i) => (
              <div className="panel__row" key={ev.id}>
                <input
                  type="text"
                  placeholder="Año (ej. 1975)"
                  value={ev.year_label}
                  onChange={(e) =>
                    setEvents((list) =>
                      list.map((item, idx) => (idx === i ? { ...item, year_label: e.target.value } : item))
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Qué pasó ese año"
                  value={ev.description}
                  onChange={(e) =>
                    setEvents((list) =>
                      list.map((item, idx) => (idx === i ? { ...item, description: e.target.value } : item))
                    )
                  }
                />
                <button
                  type="button"
                  className="panel__remove"
                  onClick={() => setEvents((list) => list.filter((_, idx) => idx !== i))}
                  aria-label="Quitar"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setEvents((list) => [...list, emptyEvent()])}
            >
              + Agregar momento
            </button>
          </section>

          <section className="panel__section">
            <h2>Árbol familiar</h2>
            {members.map((m, i) => (
              <div className="panel__row" key={m.id}>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={m.name}
                  onChange={(e) =>
                    setMembers((list) =>
                      list.map((item, idx) => (idx === i ? { ...item, name: e.target.value } : item))
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Parentesco (ej. Hija)"
                  value={m.relation}
                  onChange={(e) =>
                    setMembers((list) =>
                      list.map((item, idx) => (idx === i ? { ...item, relation: e.target.value } : item))
                    )
                  }
                />
                <button
                  type="button"
                  className="panel__remove"
                  onClick={() => setMembers((list) => list.filter((_, idx) => idx !== i))}
                  aria-label="Quitar"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setMembers((list) => [...list, emptyMember()])}
            >
              + Agregar familiar
            </button>
          </section>

          <button type="submit" className="btn btn-gold" disabled={saving}>
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
          {saved && <span className="panel__saved">Guardado ✓</span>}
        </form>

        <section className="panel__section">
          <h2>Álbum de fotos</h2>
          <div className="panel__photos">
            {photos.map((photo) => (
              <div className="panel__photo" key={photo.id}>
                <img src={photo.url} alt="" />
                <button type="button" onClick={() => handleDeletePhoto(photo.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <label className="btn btn-outline panel__upload">
            {uploading ? "Subiendo…" : "+ Subir foto"}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden disabled={uploading} />
          </label>
          {uploadError && <p className="auth-error">{uploadError}</p>}
        </section>
      </div>
    </div>
  );
}
