import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../components/LoginForm";
import styles from "../styles/login.module.scss";
import { ArcticOpsShieldIcon } from "@/components/icons/SnowflakeToolIcon";

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
    <main className={styles.pageWrapper} role="main">
      <section className={styles.loginSection} aria-label="Formulário de Login">
        <div className={styles.divFlex}>
          <ArcticOpsShieldIcon size={32} color="#0052cc" />
          <h3>Bem-vindo ao ArcticOps</h3>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
