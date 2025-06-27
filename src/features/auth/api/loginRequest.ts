import { api } from "@/lib/api";
import type { User } from "../types/Auth";

interface UserFromApi extends User {
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function loginRequest({
  email,
  password,
}: LoginInput): Promise<User> {
  const { data } = await api.get<UserFromApi[]>("/users", {
    params: { email, password },
  });

  if (data.length === 0) throw new Error("Credenciais inválidas");

  const { password: _, ...userWithoutPassword } = data[0];
  return userWithoutPassword;
}
