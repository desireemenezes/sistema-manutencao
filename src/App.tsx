import React, { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRoutes } from "@/routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.className =
      theme === "lightTheme" ? "lightTheme" : "darkTheme";
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
