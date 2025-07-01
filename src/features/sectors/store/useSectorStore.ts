import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Sector } from "../types/Sector";

interface SectorStore {
  sectors: Sector[]; // Dados dos setores
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
      sectors: [], // Inicialmente sem setores, serão carregados pela API
      filter: "",
      currentPage: 1,
      sectorsPerPage: 10,

      setFilter: (value) => set({ filter: value, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),

      setSectors: (sectors) => set({ sectors }), // Armazenar setores locais
      addSector: (sector) =>
        set((state) => ({ sectors: [sector, ...state.sectors] })), // Adicionar setor localmente
      updateSectorLocal: (updatedSector) =>
        set((state) => ({
          sectors: state.sectors.map((sector) =>
            sector.id === updatedSector.id ? updatedSector : sector
          ),
        })), // Atualizar setor localmente
      deleteSectorLocal: (id) =>
        set((state) => ({
          sectors: state.sectors.filter((sector) => sector.id !== id),
        })), // Excluir setor localmente
    }),
    {
      name: "sector-storage", // Persistir no localStorage
    }
  )
);
