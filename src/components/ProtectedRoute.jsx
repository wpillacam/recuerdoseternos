import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAdmin, loading, adminChecked } = useAuth();

  if (loading || (requireAdmin && user && !adminChecked)) {
    return <div className="route-loading">Cargando…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/panel" replace />;
  }

  return children;
}
