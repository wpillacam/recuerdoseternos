import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import MemorialEditor from "./MemorialEditor";
import logoIcon from "../assets/logo-icon.png";
import "./ClientPanel.css";
import "./AdminPanel.css";

export default function AdminMemorialEdit() {
  const { id } = useParams();
  const { signOut } = useAuth();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("memorials")
      .select("client_contact_name, client_contact_phone, admin_notes")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setContact(data);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="panel">
      <header className="panel__header">
        <a href="/" className="panel__brand">
          <img src={logoIcon} alt="Recuerdos Eternos" />
          <span>Recuerdos Eternos · Admin</span>
        </a>
        <div className="panel__header-actions">
          <Link to="/admin/clients" className="btn btn-outline">
            ← Clientes
          </Link>
          <button className="btn btn-outline" onClick={signOut}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="container panel__body">
        {contact && (contact.client_contact_name || contact.client_contact_phone || contact.admin_notes) && (
          <div className="panel__link admin-contact-card">
            {contact.client_contact_name && (
              <p>
                <strong>Contacto:</strong> {contact.client_contact_name}
              </p>
            )}
            {contact.client_contact_phone && (
              <p>
                <strong>WhatsApp:</strong> {contact.client_contact_phone}
              </p>
            )}
            {contact.admin_notes && (
              <p>
                <strong>Notas:</strong> {contact.admin_notes}
              </p>
            )}
          </div>
        )}

        <MemorialEditor memorialId={id} />
      </div>
    </div>
  );
}
