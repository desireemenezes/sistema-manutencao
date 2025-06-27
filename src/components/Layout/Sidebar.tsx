import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "@/hooks/useSidebar";
import { useClickOutside } from "@/utils/useClickOutside";
import styles from "./styles/layout.module.scss";
import { SIDEBAR_LINKS_BY_ROLE } from "@/constants/sidebarLinks";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const { user } = useAuth();
  const sidebarRef = useRef<HTMLElement>(null);

  const role = user?.role ?? "researcher";
  const links = SIDEBAR_LINKS_BY_ROLE[role] || [];

  useClickOutside(sidebarRef, closeSidebar, isOpen);

  return (
    <nav
      id="sidebar"
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      aria-label="Menu de navegação lateral"
      ref={sidebarRef}
    >
      <h2 className="sr-only">Menu lateral</h2>
      <ul className={styles.menuList}>
        {links.map(({ label, to, icon: Icon }) => (
          <li key={to} className={styles.menuItem}>
            <Link
              to={to}
              className={styles.menuLink}
              tabIndex={isOpen ? 0 : -1}
              onClick={closeSidebar}
            >
              <Icon style={{ marginRight: "8px" }} aria-hidden />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
