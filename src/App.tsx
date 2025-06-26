import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRoutes } from "@/routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
