import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { TEMPLATE_LIST } from "../templates";
import logoIcon from "../assets/logo-icon.png";
import "./ClientPanel.css";
import "./AdminPanel.css";

function randomPassword() {
  return Math.random().toString(36).slice(-10) + "A1!";
}

const COLOR_PRESETS = ["#c6a664", "#d4af37", "#8fb3e0", "#e0a3b0", "#7fc9a0", "#c9c9d1"];

const initialForm = {
  fullName: "",
  email: "",
  tempPassword: randomPassword(),
  birthDate: "",
  deathDate: "",
  birthPlace: "",
  occupation: "",
  featuredQuote: "",
  clientContactName: "",
  clientContactPhone: "",
  adminNotes: "",
  templateId: "classic-light",
  themeColor: TEMPLATE_LIST[0].defaultColor,
  customHtml: "",
};

export default function AdminPanel() {
  const { signOut } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleTemplateChange = (templateId) => {
    const entry = TEMPLATE_LIST.find((t) => t.id === templateId);
    setForm((f) => ({
      ...f,
      templateId,
      themeColor: entry ? entry.defaultColor : f.themeColor,
    }));
  };

  const handleHtmlFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("customHtml", String(reader.result || ""));
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setResult(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    try {
      const res = await fetch("/api/create-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo crear el cliente.");
      setResult({ ...data, email: form.email, tempPassword: form.tempPassword });
      setForm({ ...initialForm, tempPassword: randomPassword() });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="panel">
      <header className="panel__header">
        <a href="/" className="panel__brand">
          <img src={logoIcon} alt="Recuerdos Eternos" />
          <span>Recuerdos Eternos · Admin</span>
        </a>
        <div className="panel__header-actions">
          <Link to="/admin/clients" className="btn btn-outline">
            Clientes
          </Link>
          <button className="btn btn-outline" onClick={signOut}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="container panel__body">
        <section className="panel__section">
          <h2>Crear cliente nuevo</h2>
          <form className="panel__form admin-form" onSubmit={handleSubmit}>
            <h3 className="admin-form__subhead">Datos del difunto/a</h3>
            <div className="panel__grid">
              <label>
                Nombre completo
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Ej. María Elena Quispe"
                />
              </label>
              <label>
                Ocupación o título
                <input
                  type="text"
                  value={form.occupation}
                  onChange={(e) => update("occupation", e.target.value)}
                  placeholder="Ej. Maestra rural"
                />
              </label>
              <label>
                Fecha de nacimiento
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => update("birthDate", e.target.value)}
                />
              </label>
              <label>
                Fecha de fallecimiento
                <input
                  type="date"
                  value={form.deathDate}
                  onChange={(e) => update("deathDate", e.target.value)}
                />
              </label>
              <label>
                Lugar de nacimiento
                <input
                  type="text"
                  value={form.birthPlace}
                  onChange={(e) => update("birthPlace", e.target.value)}
                  placeholder="Ej. Huamanga, Ayacucho"
                />
              </label>
            </div>
            <label>
              Frase o cita para destacar
              <input
                type="text"
                value={form.featuredQuote}
                onChange={(e) => update("featuredQuote", e.target.value)}
                placeholder='Ej. "Su sabiduría guiará siempre a la familia"'
              />
            </label>

            <h3 className="admin-form__subhead">Datos de contacto del cliente</h3>
            <div className="panel__grid">
              <label>
                Nombre de quien contrata
                <input
                  type="text"
                  value={form.clientContactName}
                  onChange={(e) => update("clientContactName", e.target.value)}
                  placeholder="Ej. Rosa Quispe Huamán"
                />
              </label>
              <label>
                WhatsApp de contacto
                <input
                  type="text"
                  value={form.clientContactPhone}
                  onChange={(e) => update("clientContactPhone", e.target.value)}
                  placeholder="Ej. 987 654 321"
                />
              </label>
              <label>
                Correo de acceso al panel
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="cliente@correo.com"
                />
              </label>
              <label>
                Contraseña temporal
                <input
                  type="text"
                  required
                  value={form.tempPassword}
                  onChange={(e) => update("tempPassword", e.target.value)}
                />
              </label>
            </div>
            <label>
              Notas internas (solo las ves tú)
              <textarea
                rows={2}
                value={form.adminNotes}
                onChange={(e) => update("adminNotes", e.target.value)}
                placeholder="Ej. Prefiere tono azul, pagó en 2 cuotas..."
              />
            </label>

            <h3 className="admin-form__subhead">Plantilla del memorial</h3>
            <div className="admin-template-options">
              {TEMPLATE_LIST.map((tpl) => (
                <label
                  key={tpl.id}
                  className={`admin-template-option ${form.templateId === tpl.id ? "admin-template-option--active" : ""}`}
                >
                  <input
                    type="radio"
                    name="templateId"
                    checked={form.templateId === tpl.id}
                    onChange={() => handleTemplateChange(tpl.id)}
                  />
                  {tpl.label}
                </label>
              ))}
              <label
                className={`admin-template-option ${form.templateId === "custom" ? "admin-template-option--active" : ""}`}
              >
                <input
                  type="radio"
                  name="templateId"
                  checked={form.templateId === "custom"}
                  onChange={() => handleTemplateChange("custom")}
                />
                Personalizada
              </label>
            </div>

            {form.templateId !== "custom" ? (
              <div className="admin-color-picker">
                <label>
                  Color de acento
                  <input
                    type="color"
                    value={form.themeColor}
                    onChange={(e) => update("themeColor", e.target.value)}
                  />
                </label>
                <div className="admin-color-swatches">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className={`admin-swatch ${form.themeColor === color ? "admin-swatch--active" : ""}`}
                      style={{ background: color }}
                      onClick={() => update("themeColor", color)}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="admin-custom-html">
                <label>
                  Sube el archivo .html de la plantilla personalizada
                  <input type="file" accept=".html,text/html" onChange={handleHtmlFile} />
                </label>
                <label>
                  O pega el HTML completo aquí
                  <textarea
                    rows={6}
                    value={form.customHtml}
                    onChange={(e) => update("customHtml", e.target.value)}
                    placeholder="<!doctype html>..."
                  />
                </label>
              </div>
            )}

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="btn btn-gold" disabled={submitting}>
              {submitting ? "Creando…" : "Crear memorial"}
            </button>
          </form>
        </section>

        {result && (
          <section className="panel__section">
            <h2>Cliente creado</h2>
            <p>
              Enlace del memorial:{" "}
              <a href={`/${result.memorialId}`} target="_blank" rel="noreferrer">
                {window.location.origin}/{result.memorialId}
              </a>
            </p>
            <p>Comparte estos datos de acceso con el cliente por WhatsApp:</p>
            <p>
              Correo: <strong>{result.email}</strong>
              <br />
              Contraseña: <strong>{result.tempPassword}</strong>
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
