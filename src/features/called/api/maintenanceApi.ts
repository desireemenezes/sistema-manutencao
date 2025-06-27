import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "../../../lib/api"; // ajuste o caminho conforme sua estrutura
import type { MaintenanceRequest } from "../types/Maintenance";

// Buscar lista de chamados
export const useMaintenanceList = () => {
  return useQuery<MaintenanceRequest[]>(["maintenanceRequests"], async () => {
    const { data } = await api.get("/maintenanceRequests");
    return data;
  });
};

// Criar chamado
export const useCreateMaintenance = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newRequest: Omit<MaintenanceRequest, "id">) =>
      api.post("/maintenanceRequests", newRequest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["maintenanceRequests"]);
      },
    }
  );
};

// Atualizar chamado (status, conclusão, etc)
export const useUpdateMaintenance = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedRequest: MaintenanceRequest) =>
      api.put(`/maintenanceRequests/${updatedRequest.id}`, updatedRequest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["maintenanceRequests"]);
      },
    }
  );
};
