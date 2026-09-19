import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { TEMPLATES } from "../templates";
import logoIcon from "../assets/logo-icon.png";
import "./ClientPanel.css";
import "./AdminPanel.css";

export default function AdminClients() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [memorials, setMemorials] = useState([]);

  useEffect(() => {
    let active = true;
    supabase
      .from("memorials")
      .select("id, full_name, template_id, client_contact_name, created_at, is_demo, is_placeholder")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!active) return;
        setMemorials(data ?? []);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const templateLabel = (id) => {
    if (id === "custom") return "Personalizada";
    return TEMPLATES[id]?.label ?? id;
  };

  const demoMemorials = memorials.filter((m) => m.is_demo);
  const availableMemorials = memorials.filter((m) => m.is_placeholder && !m.is_demo);
  const clientMemorials = memorials.filter((m) => !m.is_demo && !m.is_placeholder);

  const renderRow = (m) => (
    <div
      className={`admin-client-row ${m.is_demo ? "admin-client-row--demo" : ""} ${
        m.is_placeholder ? "admin-client-row--available" : ""
      }`}
      key={m.id}
    >
      <div>
        <p className="admin-client-row__name">
          {m.is_demo && <span className="admin-demo-badge">DEMO</span>}
          {m.is_placeholder && <span className="admin-available-badge">DISPONIBLE</span>}
          {m.is_placeholder ? m.id : m.full_name}
        </p>
        <p className="admin-client-row__meta">
          {templateLabel(m.template_id)}
          {m.client_contact_name && !m.is_demo && !m.is_placeholder ? ` · ${m.client_contact_name}` : ""}
        </p>
      </div>
      <div className="admin-client-row__actions">
        <a href={`/${m.id}`} target="_blank" rel="noreferrer" className="btn btn-outline">
          Ver página
        </a>
        <Link to={`/admin/clients/${m.id}`} className="btn btn-gold">
          Editar contenido
        </Link>
      </div>
    </div>
  );

  return (
    <div className="panel">
      <header className="panel__header">
        <a href="/" className="panel__brand">
          <img src={logoIcon} alt="Recuerdos Eternos" />
          <span>Recuerdos Eternos · Admin</span>
        </a>
        <div className="panel__header-actions">
          <Link to="/admin" className="btn btn-outline">
            + Crear cliente
          </Link>
          <button className="btn btn-outline" onClick={signOut}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="container panel__body">
        {loading ? (
          <section className="panel__section">
            <p>Cargando…</p>
          </section>
        ) : (
          <>
            {demoMemorials.length > 0 && (
              <section className="panel__section">
                <h2>Demos de venta</h2>
                <p className="admin-clients-hint">
                  Úsalos para mostrarle a un cliente potencial cómo se vería su memorial antes de que decida.
                </p>
                <div className="admin-clients-list">{demoMemorials.map(renderRow)}</div>
              </section>
            )}

            {availableMemorials.length > 0 && (
              <section className="panel__section">
                <h2>Disponibles (QR ya impresos, sin asignar)</h2>
                <p className="admin-clients-hint">
                  Entrégaselos a un cliente que compra en el momento y luego carga el contenido real
                  aquí mismo — deja de aparecer como "disponible" en cuanto guardes cambios.
                </p>
                <div className="admin-clients-list">{availableMemorials.map(renderRow)}</div>
              </section>
            )}

            <section className="panel__section">
              <h2>Clientes</h2>
              {clientMemorials.length === 0 ? (
                <p>Todavía no has creado ningún cliente.</p>
              ) : (
                <div className="admin-clients-list">{clientMemorials.map(renderRow)}</div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
