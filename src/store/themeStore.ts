// src/store/themeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "darkTheme" | "lightTheme";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "lightTheme",
      toggleTheme: () => {
        const newTheme =
          get().theme === "lightTheme" ? "darkTheme" : "lightTheme";
        set({ theme: newTheme });
        document.documentElement.classList.remove("lightTheme", "darkTheme");
        document.documentElement.classList.add(newTheme);
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
