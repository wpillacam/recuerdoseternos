import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logoIcon from "../assets/logo-icon.png";
import "./ContractAccept.css";

const WHATSAPP_NUMBER = "51914772762";

function buildAcceptWaUrl(contract) {
  const text = encodeURIComponent(
    `Hola, confirmo que acepté el contrato del memorial digital de ${
      contract.homenajeado_nombre || contract.cliente_nombre
    }. Mi nombre: ${contract.cliente_nombre}.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ContractAccept() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [contract, setContract] = useState(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase.rpc("get_contract_by_token", { p_token: token });
      if (!active) return;
      if (error || !data || data.length === 0) {
        setStatus("notfound");
        return;
      }
      setContract(data[0]);
      setStatus("ready");
    }
    load();
    return () => {
      active = false;
    };
  }, [token]);

  const handleAccept = async () => {
    setAccepting(true);
    // Open a blank tab synchronously (still inside the click gesture) so mobile
    // browsers don't block it once we navigate it to the wa.me link below.
    const waWindow = window.open("", "_blank");
    const { data, error } = await supabase.rpc("accept_contract", { p_token: token });
    setAccepting(false);
    if (!error && data && data.length > 0) {
      setContract(data[0]);
      if (waWindow) waWindow.location.href = buildAcceptWaUrl(data[0]);
    } else if (waWindow) {
      waWindow.close();
    }
  };

  if (status === "loading") {
    return <div className="caccept-loading">Cargando contrato...</div>;
  }

  if (status === "notfound") {
    return (
      <div className="caccept-page">
        <div className="caccept-card">
          <div className="caccept-header">
            <img className="caccept-logo" src={logoIcon} alt="Recuerdos Eternos" />
            <h1>Contrato no encontrado</h1>
          </div>
          <div className="caccept-body">
            <p>El enlace no es válido o el contrato fue eliminado. Comunícate con quien te lo envió.</p>
          </div>
        </div>
      </div>
    );
  }

  const accepted = contract.estado === "Aceptado";

  return (
    <div className="caccept-page">
      <div className="caccept-card">
        <div className="caccept-header">
          <img className="caccept-logo" src={logoIcon} alt="Recuerdos Eternos" />
          <h1>
            Recuerdos Eternos
            <br />
            <span className="caccept-h1-sub">Yuyarisqayki</span>
          </h1>
          <p className="caccept-sub">Contrato de servicio — memorial digital</p>
        </div>

        <div className="caccept-body">
        <div className="caccept-section">
          <h2>Datos del cliente</h2>
          <dl>
            <div>
              <dt>Nombre</dt>
              <dd>{contract.cliente_nombre}</dd>
            </div>
            {contract.cliente_dni && (
              <div>
                <dt>DNI</dt>
                <dd>{contract.cliente_dni}</dd>
              </div>
            )}
            {contract.cliente_direccion && (
              <div>
                <dt>Dirección</dt>
                <dd>{contract.cliente_direccion}</dd>
              </div>
            )}
          </dl>
        </div>

        {contract.homenajeado_nombre && (
          <div className="caccept-section">
            <h2>Homenajeado(a)</h2>
            <dl>
              <div>
                <dt>Nombre</dt>
                <dd>{contract.homenajeado_nombre}</dd>
              </div>
              {contract.relacion_cliente && (
                <div>
                  <dt>Relación con el cliente</dt>
                  <dd>{contract.relacion_cliente}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        <div className="caccept-section">
          <h2>Servicio contratado</h2>
          <p className="caccept-service-desc">
            Creación y alojamiento perpetuo de un memorial digital conmemorativo (página web prediseñada),
            accesible mediante código QR, que incluye: fotografías, biografía, línea de vida, árbol familiar,
            libro de condolencias y vela digital. Pago único, sin mensualidades ni renovaciones.
          </p>
          <dl>
            {contract.plantilla && (
              <div>
                <dt>Plantilla</dt>
                <dd>{contract.plantilla}</dd>
              </div>
            )}
            {contract.forma_pago && (
              <div>
                <dt>Forma de pago</dt>
                <dd>{contract.forma_pago}</dd>
              </div>
            )}
          </dl>
          {contract.precio != null && (
            <div className="caccept-price-box">
              <span className="label">Precio acordado</span>
              <span className="caccept-price">S/ {Number(contract.precio).toFixed(2)}</span>
            </div>
          )}
        </div>

        <p className="caccept-declaration">
          Al tocar "Sí, acepto" confirmas que leíste y aceptas los términos de este contrato, y autorizas el
          uso de la información proporcionada para la elaboración del memorial digital descrito.
        </p>

        {accepted ? (
          <div className="caccept-done">
            <div className="caccept-check">✓</div>
            <p>
              Contrato aceptado el <strong>{formatDate(contract.fecha_aceptacion)}</strong>.
            </p>
            <p className="caccept-thanks">Gracias por confiar en Recuerdos Eternos.</p>
            <a
              className="btn btn-whatsapp caccept-btn"
              href={buildAcceptWaUrl(contract)}
              target="_blank"
              rel="noreferrer"
            >
              Avisar por WhatsApp
            </a>
          </div>
        ) : (
          <button className="btn btn-gold caccept-btn" onClick={handleAccept} disabled={accepting}>
            {accepting ? "Procesando..." : "Sí, acepto"}
          </button>
        )}

        <div className="caccept-footer">
          Un producto de W&amp;J · Consultoría Integral en Software · RUC 20607101061
        </div>
        </div>
      </div>
    </div>
  );
}
