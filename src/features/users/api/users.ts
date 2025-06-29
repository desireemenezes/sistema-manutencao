import { api } from "@/lib/api";
import type { User } from "@/types/Auth";

const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

const createUser = async (
  input: Omit<User, "id"> & { password: string }
): Promise<User> => {
  const response = await api.post("/users", input);
  return response.data;
};

const updateUser = async (
  input: Pick<User, "id" | "fullName" | "email" | "role">
): Promise<User> => {
  const response = await api.put(`/users/${input.id}`, input);
  return response.data;
};

const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export { getUsers, createUser, updateUser, deleteUser };
