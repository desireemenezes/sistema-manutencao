export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "technician" | "researcher" | "manager";
}
