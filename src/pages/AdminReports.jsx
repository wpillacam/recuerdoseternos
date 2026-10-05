import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { TEMPLATES } from "../templates";
import logoIcon from "../assets/logo-icon.png";
import "./ClientPanel.css";
import "./AdminPanel.css";
import "./AdminReports.css";

const DAYS_RANGE = 30;

function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

function lastNDays(n) {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  return days;
}

function shortLabel(date) {
  return date.toLocaleDateString("es-PE", { day: "2-digit", month: "short" });
}

export default function AdminReports() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [memorials, setMemorials] = useState([]);
  const [candleLights, setCandleLights] = useState([]);
  const [condolenceCountByMemorial, setCondolenceCountByMemorial] = useState({});
  const [selectedId, setSelectedId] = useState("all");

  useEffect(() => {
    let active = true;

    async function load() {
      const since = new Date();
      since.setDate(since.getDate() - (DAYS_RANGE - 1));
      since.setHours(0, 0, 0, 0);

      const [{ data: memorialRows }, { data: candleRows }, { data: condolenceRows }] = await Promise.all([
        supabase
          .from("memorials")
          .select("id, full_name, template_id, is_demo, is_placeholder, visit_count, candle_count")
          .order("candle_count", { ascending: false }),
        supabase.from("candle_lights").select("memorial_id, created_at").gte("created_at", since.toISOString()),
        supabase.from("condolences").select("memorial_id"),
      ]);

      if (!active) return;

      setMemorials(memorialRows ?? []);
      setCandleLights(candleRows ?? []);

      const condCount = {};
      (condolenceRows ?? []).forEach((c) => {
        condCount[c.memorial_id] = (condCount[c.memorial_id] ?? 0) + 1;
      });
      setCondolenceCountByMemorial(condCount);

      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const realMemorials = useMemo(() => memorials.filter((m) => !m.is_placeholder), [memorials]);

  const totals = useMemo(() => {
    const scope = selectedId === "all" ? realMemorials : realMemorials.filter((m) => m.id === selectedId);
    return {
      candles: scope.reduce((sum, m) => sum + (m.candle_count ?? 0), 0),
      visits: scope.reduce((sum, m) => sum + (m.visit_count ?? 0), 0),
      condolences:
        selectedId === "all"
          ? Object.values(condolenceCountByMemorial).reduce((a, b) => a + b, 0)
          : condolenceCountByMemorial[selectedId] ?? 0,
      memorials: scope.length,
    };
  }, [realMemorials, selectedId, condolenceCountByMemorial]);

  const chartData = useMemo(() => {
    const days = lastNDays(DAYS_RANGE);
    const counts = new Map(days.map((d) => [dayKey(d), 0]));

    candleLights.forEach((row) => {
      if (selectedId !== "all" && row.memorial_id !== selectedId) return;
      const key = row.created_at.slice(0, 10);
      if (counts.has(key)) counts.set(key, counts.get(key) + 1);
    });

    const values = days.map((d) => counts.get(dayKey(d)) ?? 0);
    const max = Math.max(1, ...values);
    return days.map((d, i) => ({ date: d, count: values[i], pct: (values[i] / max) * 100 }));
  }, [candleLights, selectedId]);

  const ranking = useMemo(
    () => [...realMemorials].sort((a, b) => (b.candle_count ?? 0) - (a.candle_count ?? 0)),
    [realMemorials]
  );

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
          <Link to="/admin/clients" className="btn btn-outline">
            Clientes
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
            <section className="panel__section">
              <div className="reports__top">
                <h2>Reportes y actividad</h2>
                <label className="reports__select">
                  Memorial
                  <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                    <option value="all">Todos los memoriales</option>
                    {realMemorials.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.is_demo ? "[DEMO] " : ""}
                        {m.full_name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="reports__cards">
                <div className="reports__card">
                  <span className="reports__card-value">{totals.candles}</span>
                  <span className="reports__card-label">Velas encendidas (total)</span>
                </div>
                <div className="reports__card">
                  <span className="reports__card-value">{totals.visits}</span>
                  <span className="reports__card-label">Visitas (total)</span>
                </div>
                <div className="reports__card">
                  <span className="reports__card-value">{totals.condolences}</span>
                  <span className="reports__card-label">Condolencias</span>
                </div>
                <div className="reports__card">
                  <span className="reports__card-value">{totals.memorials}</span>
                  <span className="reports__card-label">Memoriales en el alcance</span>
                </div>
              </div>
            </section>

            <section className="panel__section">
              <h2>Velas encendidas · últimos {DAYS_RANGE} días</h2>
              <p className="admin-clients-hint">
                Útil para ver picos de actividad, por ejemplo alrededor del 1 y 2 de noviembre.
              </p>
              <div className="reports__chart">
                {chartData.map((d) => (
                  <div className="reports__bar-wrap" key={dayKey(d.date)} title={`${shortLabel(d.date)}: ${d.count}`}>
                    <div className="reports__bar" style={{ height: `${Math.max(d.pct, d.count > 0 ? 4 : 0)}%` }} />
                    {d.date.getDate() === 1 || d.date.getDay() === 1 ? (
                      <span className="reports__bar-label">{shortLabel(d.date)}</span>
                    ) : (
                      <span className="reports__bar-label reports__bar-label--muted"> </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="panel__section">
              <h2>Ranking por memorial</h2>
              <div className="reports__table">
                <div className="reports__table-row reports__table-row--head">
                  <span>Memorial</span>
                  <span>Plantilla</span>
                  <span>Visitas</span>
                  <span>Velas</span>
                  <span>Condolencias</span>
                </div>
                {ranking.map((m) => (
                  <div className="reports__table-row" key={m.id}>
                    <span className="reports__table-name">
                      {m.is_demo && <span className="admin-demo-badge">DEMO</span>} {m.full_name}
                    </span>
                    <span>{templateLabel(m.template_id)}</span>
                    <span>{m.visit_count ?? 0}</span>
                    <span>{m.candle_count ?? 0}</span>
                    <span>{condolenceCountByMemorial[m.id] ?? 0}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
