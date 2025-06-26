import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Layout } from "@/components/Layout/Layout";
import { Dashboard } from "@/features/pages/Dashboard/Dashboard";
import { Called } from "@/features/pages/Called/Called";
import { Users } from "@/features/pages/Users/Users";
import { Sectors } from "@/features/pages/Sectors/Sectors";
import { Equipment } from "@/features/pages/Equipment/Equipment";
import { History } from "@/features/pages/History/History";
import { CalledAssigned } from "@/features/pages/CalledAssigned/CalledAssigned";
import { MyCalled } from "@/features/pages/MyCalled/MyCalled";

export function AppRoutes() {
  const { isAuthenticated, user } = useAuth();
  const role = user?.role ?? "";

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        {role === "manager" && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chamados" element={<Called />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/setores" element={<Sectors />} />
            <Route path="/equipamentos" element={<Equipment />} />
            <Route path="/historico" element={<History />} />
          </>
        )}

        {role === "technician" && (
          <Route path="/chamados-atribuidos" element={<CalledAssigned />} />
        )}

        {role === "researcher" && (
          <Route path="/meus-chamados" element={<MyCalled />} />
        )}

        {/* Redirecionamento para rota inicial correta */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                role === "manager"
                  ? "/dashboard"
                  : role === "technician"
                  ? "/chamados-atribuidos"
                  : "/meus-chamados"
              }
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
}
