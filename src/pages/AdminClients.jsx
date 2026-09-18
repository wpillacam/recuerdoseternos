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
      .select("id, full_name, template_id, client_contact_name, created_at")
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
        <section className="panel__section">
          <h2>Clientes</h2>

          {loading ? (
            <p>Cargando…</p>
          ) : memorials.length === 0 ? (
            <p>Todavía no has creado ningún cliente.</p>
          ) : (
            <div className="admin-clients-list">
              {memorials.map((m) => (
                <div className="admin-client-row" key={m.id}>
                  <div>
                    <p className="admin-client-row__name">{m.full_name}</p>
                    <p className="admin-client-row__meta">
                      {templateLabel(m.template_id)}
                      {m.client_contact_name ? ` · ${m.client_contact_name}` : ""}
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
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
