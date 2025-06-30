import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import styles from "./styles/layout.module.scss";

export function Layout() {
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Quando a rota muda, foca o main para melhorar navegação por teclado e leitores de tela
    mainRef.current?.focus();
  }, [location]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main
          tabIndex={-1}
          aria-label="Conteúdo principal"
          className={styles.main_content}
          ref={mainRef}
        >
          <Outlet />

          <footer className={styles.footer}>
            <small>
              Desenvolvido por <strong>Desirée Menezes</strong> &copy;{" "}
              {new Date().getFullYear()}
            </small>
          </footer>
        </main>
      </div>
    </div>
  );
}
