import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";

// Lazy loaded pages corrigidos para exportações nomeadas
const LoginPage = lazy(() =>
  import("@/features/auth/pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);

// Manager Pages
const Dashboard = lazy(() =>
  import("@/features/dashboard/pages/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);
const Called = lazy(() =>
  import("@/features/called/pages/Called").then((module) => ({
    default: module.Called,
  }))
);
const CalledForm = lazy(() =>
  import("@/features/called/pages/CalledForm").then((module) => ({
    default: module.CalledForm,
  }))
);
const Users = lazy(() =>
  import("@/features/users/pages/Users").then((module) => ({
    default: module.Users,
  }))
);
const UserForm = lazy(() =>
  import("@/features/users/pages/UserForm").then((module) => ({
    default: module.UserForm,
  }))
);
const Sectors = lazy(() =>
  import("@/features/sectors/pages/Sectors").then((module) => ({
    default: module.Sectors,
  }))
);
const Equipment = lazy(() =>
  import("@/features/equipment/pages/Equipment").then((module) => ({
    default: module.Equipment,
  }))
);
const EquipmentForm = lazy(() =>
  import("@/features/equipment/pages/EquipmentForm").then((module) => ({
    default: module.EquipmentForm,
  }))
);
const History = lazy(() =>
  import("@/features/history/pages/History").then((module) => ({
    default: module.History,
  }))
);

// Technician Page
const CalledAssigned = lazy(() =>
  import("@/features/called/pages/CalledAssigned").then((module) => ({
    default: module.CalledAssigned,
  }))
);

export function AppRoutes() {
  const { isAuthenticated, user } = useAuth();
  const role = user?.role ?? "";

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route element={<Layout />}>
            {role === "manager" && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chamados" element={<Called />} />
                <Route path="/chamados/novo" element={<CalledForm />} />
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
        )}
      </Routes>
    </Suspense>
  );
}
