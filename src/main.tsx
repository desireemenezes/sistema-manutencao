import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "@/styles/global.scss";

// Aplica o tema salvo no HTML
const savedTheme = localStorage.getItem("theme-storage");
if (savedTheme) {
  try {
    const parsed = JSON.parse(savedTheme);
    const theme = parsed.state.theme;
    document.documentElement.setAttribute("data-theme", theme);
  } catch {
    document.documentElement.setAttribute("data-theme", "light");
  }
} else {
  document.documentElement.setAttribute("data-theme", "light");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
