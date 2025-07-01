import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Sector } from "../types/Sector";

interface SectorStore {
  sectors: Sector[];
  filter: string;
  currentPage: number;
  sectorsPerPage: number;
  setFilter: (value: string) => void;
  setCurrentPage: (page: number) => void;

  setSectors: (sectors: Sector[]) => void;
  addSector: (sector: Sector) => void;
  updateSectorLocal: (sector: Sector) => void;
  deleteSectorLocal: (id: number) => void;
}

export const useSectorStore = create<SectorStore>()(
  persist(
    (set) => ({
      sectors: [],
      filter: "",
      currentPage: 1,
      sectorsPerPage: 10,

      setFilter: (value) => set({ filter: value, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),

      setSectors: (sectors) => set({ sectors }),
      addSector: (sector) =>
        set((state) => ({ sectors: [sector, ...state.sectors] })),
      updateSectorLocal: (updatedSector) =>
        set((state) => ({
          sectors: state.sectors.map((sector) =>
            sector.id === updatedSector.id ? updatedSector : sector
          ),
        })),
      deleteSectorLocal: (id) =>
        set((state) => ({
          sectors: state.sectors.filter((sector) => sector.id !== id),
        })),
    }),
    {
      name: "sector-storage", // chave do localStorage
    }
  )
);
