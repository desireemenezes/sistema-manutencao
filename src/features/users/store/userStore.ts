import { create } from "zustand";

interface UserStore {
  filter: string;
  currentPage: number;
  usersPerPage: number;

  setFilter: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  filter: "",
  currentPage: 1,
  usersPerPage: 10,

  // Reseta currentPage para 1 sempre que o filtro mudar
  setFilter: (value) => set({ filter: value, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
