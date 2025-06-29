import { create } from "zustand";

interface EquipmentStore {
  filter: string;
  currentPage: number;
  equipmentsPerPage: number;

  setFilter: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useEquipmentStore = create<EquipmentStore>((set) => ({
  filter: "",
  currentPage: 1,
  equipmentsPerPage: 10,

  setFilter: (value) => set({ filter: value, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
