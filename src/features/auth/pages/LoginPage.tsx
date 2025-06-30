import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import styles from "./LoginPage.module.scss";
import { ArcticOpsShieldIcon } from "@/components/icons/SnowflakeToolIcon";
import { getRedirectPathByRole } from "../utils/redirectByRole";
import { useAuth } from "@/hooks/useAuth";

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
          <h1>Bem-vindo ao ArcticOps</h1>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
