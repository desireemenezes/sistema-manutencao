import { create } from "zustand";

interface MaintenanceFilterState {
  typeFilter: string | null;
  statusFilter: string | null;
  assignedToFilter: number | null;
  setTypeFilter: (type: string | null) => void;
  setStatusFilter: (status: string | null) => void;
  setAssignedToFilter: (assignedTo: number | null) => void;
  resetFilters: () => void;
}

export const useMaintenanceStore = create<MaintenanceFilterState>((set) => ({
  typeFilter: null,
  statusFilter: null,
  assignedToFilter: null,
  setTypeFilter: (type) => set({ typeFilter: type }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setAssignedToFilter: (assignedTo) => set({ assignedToFilter: assignedTo }),
  resetFilters: () =>
    set({ typeFilter: null, statusFilter: null, assignedToFilter: null }),
}));
