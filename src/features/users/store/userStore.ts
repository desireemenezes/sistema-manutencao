import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/Auth";

interface UserStore {
  users: User[];
  filter: string;
  currentPage: number;
  usersPerPage: number;

  setFilter: (value: string) => void;
  setCurrentPage: (page: number) => void;
  addUser: (user: User) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (id: number) => void;
  setUsers: (users: User[]) => void;
  updateUserLocal: (updatedUser: User) => void; // Função para atualizar usuário localmente
  deleteUserLocal: (id: number) => void; // Função para deletar usuário localmente
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      filter: "",
      currentPage: 1,
      usersPerPage: 10,

      setFilter: (value) => set({ filter: value, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),

      // Função para adicionar um novo usuário
      addUser: (user) =>
        set((state) => {
          const newUsers = [user, ...state.users];
          localStorage.setItem("users", JSON.stringify(newUsers));
          return { users: newUsers };
        }),

      // Função para atualizar o usuário
      updateUser: (updatedUser) =>
        set((state) => {
          const newUsers = state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
          localStorage.setItem("users", JSON.stringify(newUsers));
          return { users: newUsers };
        }),

      // Função para excluir um usuário
      deleteUser: (id) =>
        set((state) => {
          const newUsers = state.users.filter((user) => user.id !== id);
          localStorage.setItem("users", JSON.stringify(newUsers));
          return { users: newUsers };
        }),

      // Função para setar os usuários
      setUsers: (users) => set({ users }),

      // Função para atualizar usuário localmente
      updateUserLocal: (updatedUser) =>
        set((state) => {
          const newUsers = state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
          localStorage.setItem("users", JSON.stringify(newUsers));
          return { users: newUsers };
        }),

      // Função para excluir usuário localmente
      deleteUserLocal: (id) =>
        set((state) => {
          const newUsers = state.users.filter((user) => user.id !== id);
          localStorage.setItem("users", JSON.stringify(newUsers));
          return { users: newUsers };
        }),
    }),
    {
      name: "user-storage", // chave do localStorage
    }
  )
);
