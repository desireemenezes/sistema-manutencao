import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRoutes } from "@/routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
