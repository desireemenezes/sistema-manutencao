import { useAuthStore } from "../store/authStore";

export function useAuth() {
  const { user, login, logout } = useAuthStore();

  const isAuthenticated = !!user;
  const isManager = user?.role === "manager";
  const isTechnician = user?.role === "technician";
  const isResearcher = user?.role === "researcher";

  return {
    user,
    isAuthenticated,
    login,
    logout,
    isManager,
    isTechnician,
    isResearcher,
  };
}
