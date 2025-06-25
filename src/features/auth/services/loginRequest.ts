import { api } from "@/lib/api";
import type { User } from "../types/Auth";

interface LoginInput {
  email: string;
  password: string;
}

export async function loginRequest({
  email,
  password,
}: LoginInput): Promise<User> {
  const { data } = await api.get<User[]>("/users", {
    params: { email, password },
  });

  if (data.length === 0) throw new Error("Credenciais inválidas");

  return data[0];
}
