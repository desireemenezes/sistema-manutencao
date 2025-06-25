import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
