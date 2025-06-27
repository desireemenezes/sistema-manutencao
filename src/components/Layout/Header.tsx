import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/hooks/useSidebar";
import styles from "./styles/layout.module.scss";
import { ThemeToggle } from "../Toggle/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isOpen, toggleSidebar } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header} role="banner">
      <button
        className={styles["sidebar-toggle"]}
        aria-label={isOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
        aria-expanded={isOpen}
        aria-controls="sidebar"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <h1 className={styles["header-title"]}>ArticOps</h1>
      <div className={styles["user-info"]}>
        <p tabIndex={0}>Olá, {user?.fullName}</p>
        <ThemeToggle />
        <button onClick={handleLogout} aria-label="Sair do sistema">
          Sair
        </button>
      </div>
    </header>
  );
}
