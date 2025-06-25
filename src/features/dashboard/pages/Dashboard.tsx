// src/features/dashboard/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main>
      <h1>Olá, {user?.fullName}!</h1>
      <ThemeToggle />
      <button onClick={handleLogout}>Sair</button>
    </main>
  );
}
