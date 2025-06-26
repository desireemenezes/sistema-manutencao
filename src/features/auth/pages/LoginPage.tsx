import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../components/LoginForm";
import styles from "../styles/login.module.scss";
import { ArcticOpsShieldIcon } from "@/components/icons/SnowflakeToolIcon";
import { getRedirectPathByRole } from "../utils/redirectByRole";

export function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirectPath = getRedirectPathByRole(user.role);
      navigate(redirectPath, { replace: true });
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
