import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoIcon from "../assets/logo-icon.png";
import "./LoginPage.css";

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/panel" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    navigate("/panel");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <a href="/" className="auth-brand">
          <img src={logoIcon} alt="Recuerdos Eternos" />
          <span>Recuerdos Eternos</span>
        </a>

        <h1>Ingresa a tu panel</h1>
        <p className="auth-sub">Administra el memorial digital de tu ser querido.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Correo
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn btn-gold btn-block" disabled={submitting}>
            {submitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

        <p className="auth-help">
          ¿Aún no tienes cuenta? Escríbenos por WhatsApp para coordinar tu memorial y te
          enviaremos tus datos de acceso.
        </p>
      </div>
    </div>
  );
}
