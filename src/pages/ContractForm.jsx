import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import logoIcon from "../assets/logo-icon.png";
import "./ContractForm.css";

const emptyForm = {
  vendedor_nombre: "",
  cliente_nombre: "",
  cliente_dni: "",
  cliente_whatsapp: "",
  cliente_correo: "",
  cliente_direccion: "",
  homenajeado_nombre: "",
  relacion_cliente: "",
  zona: "Ayacucho",
  plantilla: "Clásica Luminosa",
  precio: "250",
  forma_pago: "Yape / Plin",
};

function digitsOnly(value) {
  return value.replace(/\D/g, "");
}

export default function ContractForm() {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(null);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.cliente_nombre.trim()) return;
    setSaving(true);
    setError("");

    const { data, error: insertError } = await supabase.rpc("create_contract", {
      p_vendedor_nombre: form.vendedor_nombre || null,
      p_cliente_nombre: form.cliente_nombre,
      p_cliente_dni: form.cliente_dni || null,
      p_cliente_whatsapp: digitsOnly(form.cliente_whatsapp) || null,
      p_cliente_correo: form.cliente_correo || null,
      p_cliente_direccion: form.cliente_direccion || null,
      p_homenajeado_nombre: form.homenajeado_nombre || null,
      p_relacion_cliente: form.relacion_cliente || null,
      p_zona: form.zona,
      p_plantilla: form.plantilla,
      p_precio: form.precio ? Number(form.precio) : null,
      p_forma_pago: form.forma_pago,
    });

    setSaving(false);

    if (insertError || !data || data.length === 0) {
      setError("No se pudo guardar el contrato. Intenta de nuevo.");
      return;
    }
    setCreated({ ...form, token: data[0].token, cliente_whatsapp: digitsOnly(form.cliente_whatsapp) });
  };

  const handleNew = () => {
    setCreated(null);
    setForm(emptyForm);
  };

  if (created) {
    const link = `${window.location.origin}/contrato/${created.token}`;
    const waNumber = created.cliente_whatsapp ? `51${created.cliente_whatsapp.replace(/^51/, "")}` : "";
    const waText = encodeURIComponent(
      `Hola ${created.cliente_nombre}, te comparto el contrato de tu memorial digital Recuerdos Eternos. ` +
        `Por favor revísalo y confirma tocando "Sí, acepto":\n${link}`
    );
    const waHref = waNumber ? `https://wa.me/${waNumber}?text=${waText}` : `https://wa.me/?text=${waText}`;

    return (
      <div className="cform-page">
        <div className="cform-card cform-card--done">
          <img className="cform-logo" src={logoIcon} alt="Recuerdos Eternos" />
          <h1>Contrato creado</h1>
          <p className="cform-sub">
            Ya puedes enviárselo a <strong>{created.cliente_nombre}</strong> para que lo revise y acepte.
          </p>

          <div className="cform-link-box">
            <span>{link}</span>
          </div>

          <div className="cform-actions">
            <a className="btn btn-whatsapp" href={waHref} target="_blank" rel="noreferrer">
              Enviar por WhatsApp
            </a>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigator.clipboard?.writeText(link)}
            >
              Copiar enlace
            </button>
          </div>

          <button type="button" className="cform-new" onClick={handleNew}>
            + Crear otro contrato
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cform-page">
      <form className="cform-card" onSubmit={handleSubmit}>
        <img className="cform-logo" src={logoIcon} alt="Recuerdos Eternos" />
        <h1>Nuevo contrato digital</h1>
        <p className="cform-sub">Llena los datos del cliente. Al guardar se genera el enlace para que lo acepte por WhatsApp.</p>

        <label>
          Tu nombre (vendedor/a)
          <select value={form.vendedor_nombre} onChange={(e) => update("vendedor_nombre", e.target.value)}>
            <option value="">Selecciona...</option>
            <option value="Zinthia Akira Avilés Huamán">Zinthia Akira Avilés Huamán</option>
            <option value="Hebert León Arbella">Hebert León Arbella</option>
            <option value="Henry Silva Robles">Henry Silva Robles</option>
          </select>
        </label>

        <div className="cform-section-title">Datos del cliente</div>
        <label>
          Nombre completo *
          <input
            type="text"
            required
            value={form.cliente_nombre}
            onChange={(e) => update("cliente_nombre", e.target.value)}
          />
        </label>
        <div className="cform-grid">
          <label>
            DNI
            <input type="text" value={form.cliente_dni} onChange={(e) => update("cliente_dni", e.target.value)} />
          </label>
          <label>
            WhatsApp
            <input
              type="tel"
              placeholder="914772762"
              value={form.cliente_whatsapp}
              onChange={(e) => update("cliente_whatsapp", e.target.value)}
            />
          </label>
        </div>
        <div className="cform-grid">
          <label>
            Correo (opcional)
            <input type="email" value={form.cliente_correo} onChange={(e) => update("cliente_correo", e.target.value)} />
          </label>
          <label>
            Dirección
            <input type="text" value={form.cliente_direccion} onChange={(e) => update("cliente_direccion", e.target.value)} />
          </label>
        </div>

        <div className="cform-section-title">Datos del homenajeado(a)</div>
        <div className="cform-grid">
          <label>
            Nombre del homenajeado(a)
            <input
              type="text"
              value={form.homenajeado_nombre}
              onChange={(e) => update("homenajeado_nombre", e.target.value)}
            />
          </label>
          <label>
            Relación con el cliente
            <input type="text" value={form.relacion_cliente} onChange={(e) => update("relacion_cliente", e.target.value)} />
          </label>
        </div>

        <div className="cform-section-title">Servicio</div>
        <div className="cform-grid">
          <label>
            Zona
            <select value={form.zona} onChange={(e) => update("zona", e.target.value)}>
              <option>Ayacucho</option>
              <option>Lima</option>
              <option>Otro</option>
            </select>
          </label>
          <label>
            Plantilla
            <select value={form.plantilla} onChange={(e) => update("plantilla", e.target.value)}>
              <option>Clásica Luminosa</option>
              <option>Clásica Oscura</option>
              <option>Aún no decide</option>
            </select>
          </label>
        </div>
        <div className="cform-grid">
          <label>
            Precio acordado (S/)
            <input type="number" min="0" value={form.precio} onChange={(e) => update("precio", e.target.value)} />
          </label>
          <label>
            Forma de pago
            <select value={form.forma_pago} onChange={(e) => update("forma_pago", e.target.value)}>
              <option>Efectivo</option>
              <option>Yape / Plin</option>
              <option>Transferencia</option>
            </select>
          </label>
        </div>

        {error && <p className="cform-error">{error}</p>}

        <button type="submit" className="btn btn-gold cform-submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar y generar enlace"}
        </button>
      </form>
    </div>
  );
}
