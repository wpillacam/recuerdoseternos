import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ClientPanel from "./pages/ClientPanel";
import AdminPanel from "./pages/AdminPanel";
import AdminClients from "./pages/AdminClients";
import AdminMemorialEdit from "./pages/AdminMemorialEdit";
import MemorialPage from "./pages/MemorialPage";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/panel"
              element={
                <ProtectedRoute>
                  <ClientPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/clients"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminClients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/clients/:id"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminMemorialEdit />
                </ProtectedRoute>
              }
            />
            <Route path="/:uuid" element={<MemorialPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Analytics />
    </LanguageProvider>
  );
}

export default App;
