// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Dashboard } from "@/features/pages/Dashboard";
import { Layout } from "@/components/Layout/Layout";

export function AppRoutes() {
  const { isAuthenticated, isManager } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {isAuthenticated && (
        <Route element={<Layout children={undefined} />}>
          {isManager && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chamados" element={<p>Chamados</p>} />
              <Route path="/usuarios" element={<p>Usuários</p>} />
              <Route path="/setores" element={<p>Setores</p>} />
              <Route path="/equipamentos" element={<p>Equipamentos</p>} />
              <Route path="/historico" element={<p>Histórico</p>} />
            </>
          )}

          {/* Redirecionamento para rota padrão */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      )}

      {/* Redireciona usuários não autenticados para o login */}
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}
