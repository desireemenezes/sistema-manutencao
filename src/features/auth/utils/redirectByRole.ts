import type { UserRole } from "../types/Auth";

export function getRedirectPathByRole(role: UserRole): string {
  switch (role) {
    case "manager":
      return "/dashboard";
    case "technician":
      return "/my-calls";
    case "researcher":
      return "/requests";
    default:
      return "/";
  }
}
