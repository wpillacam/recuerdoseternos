import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import MemorialEditor from "./MemorialEditor";
import logoIcon from "../assets/logo-icon.png";
import "./ClientPanel.css";

export default function ClientPanel() {
  const { user, isAdmin, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [memorialId, setMemorialId] = useState(null);

  useEffect(() => {
    if (!user) return;
    let active = true;

    supabase
      .from("memorials")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        setMemorialId(data?.id ?? null);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

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

  if (!memorialId) {
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

  return (
    <div className="panel">
      {panelHeader}
      <div className="container panel__body">
        <MemorialEditor memorialId={memorialId} />
      </div>
    </div>
  );
}
