import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { Layout } from "@/components/Layout/Layout";
import { Dashboard } from "@/features/dashboard/pages/Dashboard";
import { Called } from "@/features/called/pages/Called";
import { Users } from "@/features/users/pages/Users";
import { Sectors } from "@/features/sectors/pages/Sectors";
import { Equipment } from "@/features/equipment/pages/Equipment";
import { History } from "@/features/history/pages/History";
import { CalledForm } from "@/features/called/pages/CalledForm";
import { useAuth } from "@/hooks/useAuth";
import { CalledAssigned } from "@/features/called/pages/CalledAssigned";
import { UserForm } from "@/features/users/pages/UserForm";
import { EquipmentForm } from "@/features/equipment/pages/EquipmentForm";

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
            <Route path="/usuarios/novo" element={<UserForm />} />
            <Route path="/setores" element={<Sectors />} />
            <Route path="/equipamentos" element={<Equipment />} />
            <Route path="/equipamentos/novo" element={<EquipmentForm />} />
            <Route path="/historico" element={<History />} />
          </>
        )}

        {role === "technician" && (
          <Route path="/chamados-atribuidos" element={<CalledAssigned />} />
        )}

        {role === "researcher" && (
          <>
            <Route path="/chamados" element={<Called />} />
            <Route path="/chamados/novo" element={<CalledForm />} />
          </>
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
                  : "/chamados"
              }
              replace
            />
          }
        />
      </Route>
    </Routes>
  );
}
