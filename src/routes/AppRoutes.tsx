import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Layout } from "@/components/Layout/Layout";
import { Dashboard } from "@/features/dashboard/pages/Dashboard";
import { Called } from "@/features/called/pages/Called";
import { Users } from "@/features/users/pages/Users";
import { Sectors } from "@/features/sectors/pages/Sectors";
import { Equipment } from "@/features/equipment/pages/Equipment";
import { CalledAssigned } from "@/features/calledAssigned/pages/CalledAssigned";
import { MyCalled } from "@/features/myCalled/pages/MyCalled";
import { History } from "@/features/history/pages/History";
import { CalledForm } from "@/features/called/pages/CalledForm";

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
            <Route path="/chamados/novo" element={<CalledForm />} />{" "}
            {/* Nova rota */}
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
