import { useQuery } from "react-query";
import { api } from "@/lib/api";
import type { User } from "../types/User";

export const useTechnicians = () => {
  return useQuery<User[]>(["technicians"], async () => {
    const { data } = await api.get<User[]>("/users?role=technician");
    return data;
  });
};
