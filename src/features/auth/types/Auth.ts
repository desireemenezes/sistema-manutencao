export type UserRole = "manager" | "technician" | "researcher";

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
}
