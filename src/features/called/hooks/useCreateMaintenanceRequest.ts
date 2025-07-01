import { useMutation, useQueryClient } from "react-query";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useMaintenanceStore } from "../store/useMaintenanceStore";
import type {
  CreateMaintenanceRequest,
  MaintenanceRequest,
} from "@/types/Maintenance";

type UseCreateMaintenanceRequestProps = {
  onSuccessCallback?: () => void;
};

export const useCreateMaintenanceRequest = ({
  onSuccessCallback,
}: UseCreateMaintenanceRequestProps = {}) => {
  const queryClient = useQueryClient();
  const { addMaintenanceRequest } = useMaintenanceStore.getState();
  const { maintenanceRequests, setMaintenanceRequests } = useMaintenanceStore();

  return useMutation<MaintenanceRequest, unknown, CreateMaintenanceRequest>({
    mutationFn: async (formData) => {
      const response = await api.post("/maintenanceRequests", {
        ...formData,
        status: "open",
        completionDate: null,
        completionNotes: null,
        partsUsed: [],
      });
      return response.data;
    },
    onSuccess: (newRequest) => {
      toast.success("Chamado criado com sucesso!");

      // ✅ Atualiza Zustand local (mesmo sem revalidar com o servidor)
      addMaintenanceRequest(newRequest);

      // ✅ Opcionalmente atualiza o cache do React Query
      queryClient.setQueryData<MaintenanceRequest[]>(
        "maintenanceRequests",
        (oldData = []) => [...oldData, newRequest]
      );

      // ✅ Executa callback se existir
      onSuccessCallback?.();
    },
    onError: () => {
      toast.error("Erro ao criar chamado.");
    },
  });
};
