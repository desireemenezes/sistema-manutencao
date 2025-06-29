import { create } from "zustand";

interface SectorStore {
  filter: string;
  currentPage: number;
  sectorsPerPage: number;

  setFilter: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useSectorStore = create<SectorStore>((set) => ({
  filter: "",
  currentPage: 1,
  sectorsPerPage: 10,

  setFilter: (value) => set({ filter: value, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
