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
  const addMaintenanceRequest = useMaintenanceStore(
    (state) => state.addMaintenanceRequest
  );

  return useMutation<MaintenanceRequest, unknown, CreateMaintenanceRequest>({
    mutationFn: async (formData) => {
      const response = await api.post("/maintenanceRequests", {
        ...formData,
        status: "open",
        assignedTo: null,
        completionDate: null,
        completionNotes: null,
        partsUsed: [],
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Chamado criado com sucesso!");
      addMaintenanceRequest(data);
      queryClient.invalidateQueries("maintenanceRequests");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      toast.error("Erro ao criar chamado.");
    },
  });
};
