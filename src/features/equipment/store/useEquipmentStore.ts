import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Equipment } from "../types/Equipment";

interface EquipmentStoreState {
  equipments: Equipment[];
  setEquipments: (equipments: Equipment[]) => void;

  filter: string;
  setFilter: (filter: string) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;

  equipmentsPerPage: number;

  addEquipmentToStore: (equipment: Equipment) => void;
  removeEquipmentFromStore: (id: number) => void;
  updateEquipmentInStore: (equipment: Equipment) => void;
}

export const useEquipmentStore = create<EquipmentStoreState>()(
  persist(
    (set) => ({
      equipments: [],
      setEquipments: (equipments) => set({ equipments }),

      filter: "",
      setFilter: (filter) => set({ filter }),

      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),

      equipmentsPerPage: 10,

      addEquipmentToStore: (equipment) =>
        set((state) => ({
          equipments: [...state.equipments, equipment],
        })),

      removeEquipmentFromStore: (id) =>
        set((state) => ({
          equipments: state.equipments.filter((eq) => eq.id !== id),
        })),

      updateEquipmentInStore: (equipment) =>
        set((state) => ({
          equipments: state.equipments.map((eq) =>
            eq.id === equipment.id ? equipment : eq
          ),
        })),
    }),
    {
      name: "equipment-storage", // chave para localStorage
    }
  )
);
