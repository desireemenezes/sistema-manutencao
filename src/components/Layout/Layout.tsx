import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./styles/layout.module.scss";

export function Layout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main
          tabIndex={-1}
          aria-label="Conteúdo principal"
          className={styles.main_content}
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
