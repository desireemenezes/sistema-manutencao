import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MaintenanceStore {
  filter: string;
  currentPage: number;
  maintenancesPerPage: number;

  setFilter: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useMaintenanceStore = create(
  persist<MaintenanceStore>(
    (set) => ({
      filter: "",
      currentPage: 1,
      maintenancesPerPage: 10,

      // Reseta currentPage para 1 sempre que o filtro mudar
      setFilter: (value) => set({ filter: value, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: "maintenance-storage", // Nome para persistir os dados
    }
  )
);
