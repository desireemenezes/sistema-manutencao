import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "manager") navigate("/dashboard", { replace: true });
      else if (user.role === "technician")
        navigate("/my-calls", { replace: true });
      else if (user.role === "researcher")
        navigate("/requests", { replace: true });
    }
  }, [user, navigate]);

  return (
    <main>
      <h1>Bem-vindo ao Sistema de Manutenção</h1>
      <LoginForm />
    </main>
  );
}
