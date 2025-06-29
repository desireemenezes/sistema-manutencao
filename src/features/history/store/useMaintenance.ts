import { create } from "zustand";

interface MaintenanceStore {
  filter: string;
  currentPage: number;
  maintenancesPerPage: number;

  setFilter: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useMaintenanceStore = create<MaintenanceStore>((set) => ({
  filter: "",
  currentPage: 1,
  maintenancesPerPage: 10,

  // Reseta currentPage para 1 sempre que o filtro mudar
  setFilter: (value) => set({ filter: value, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
