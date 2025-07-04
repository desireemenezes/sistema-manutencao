import type {
  MaintenanceRequest,
  MaintenanceStatus,
} from "@/types/Maintenance";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MaintenanceStoreState {
  // Filtros
  typeFilter: string | null;
  statusFilter: string | null;
  assignedToFilter: number | null;
  setTypeFilter: (type: string | null) => void;
  setStatusFilter: (status: string | null) => void;
  setAssignedToFilter: (assignedTo: number | null) => void;
  resetFilters: () => void;

  // Lista de chamados
  maintenanceRequests: MaintenanceRequest[];
  setMaintenanceRequests: (data: MaintenanceRequest[]) => void;
  addMaintenanceRequest: (request: MaintenanceRequest) => void;
  updateStatus: (id: number, status: MaintenanceStatus) => void;
}

export const useMaintenanceStore = create<MaintenanceStoreState>()(
  persist(
    (set) => ({
      // Filtros
      typeFilter: null,
      statusFilter: null,
      assignedToFilter: null,
      setTypeFilter: (type) => set({ typeFilter: type }),
      setStatusFilter: (status) => set({ statusFilter: status }),
      setAssignedToFilter: (assignedTo) =>
        set({ assignedToFilter: assignedTo }),
      resetFilters: () =>
        set({ typeFilter: null, statusFilter: null, assignedToFilter: null }),

      // Dados
      maintenanceRequests: [],
      setMaintenanceRequests: (data) => set({ maintenanceRequests: data }),
      addMaintenanceRequest: (request) =>
        set((state) => ({
          maintenanceRequests: [...state.maintenanceRequests, request], // Adiciona o novo chamado à lista
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          maintenanceRequests: state.maintenanceRequests.map((req) =>
            req.id === id ? { ...req, status } : req
          ),
        })),
    }),
    {
      name: "maintenance-storage", // Nome para persistir no localStorage
    }
  )
);
