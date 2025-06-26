import { useThemeStore } from "@/store/themeStore";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        color: "inherit",
      }}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
