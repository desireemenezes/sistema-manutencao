import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  getEquipments,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "../api/equipments";
import { useEquipmentStore } from "./useEquipmentStore";
import type { Equipment } from "../types/Equipment";

const useEquipments = () => {
  const {
    filter,
    setFilter,
    currentPage,
    equipmentsPerPage,
    setCurrentPage,
    addEquipmentToStore,
  } = useEquipmentStore();
  const queryClient = useQueryClient();

  // Consulta equipamentos da API
  const {
    data: allEquipments,
    isLoading,
    error,
  } = useQuery<Equipment[]>(["equipments"], getEquipments, {
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    onSuccess: (data) => {
      // Sincroniza equipamentos da API na store local
      if (data) {
        // Caso queira sobrescrever lista local (ou fazer merge)
        // Aqui, para garantir consistência, podemos atualizar a store toda
        // ou ignorar se preferir mesclar.
        // Vou deixar simples e substituir:
        useEquipmentStore.getState().setEquipments(data);
      }
    },
  });

  // Filtra e pagina localmente
  const normalizedFilter = filter.toLowerCase();
  const filteredEquipments =
    allEquipments?.filter((equipment) =>
      equipment.name.toLowerCase().includes(normalizedFilter)
    ) ?? [];

  const indexOfLast = currentPage * equipmentsPerPage;
  const indexOfFirst = indexOfLast - equipmentsPerPage;
  const paginatedEquipments = filteredEquipments.slice(
    indexOfFirst,
    indexOfLast
  );

  // Mutation para criar equipamento
  const createMutation = useMutation(createEquipment, {
    onSuccess: (newEquipment) => {
      queryClient.invalidateQueries(["equipments"]);
      toast.success("Equipamento criado com sucesso!");

      // Atualiza localmente a store com o equipamento criado
      addEquipmentToStore(newEquipment);
    },
    onError: () => {
      toast.error("Erro ao criar equipamento.");
    },
  });

  // Mutation para atualizar equipamento
  const updateMutation = useMutation(updateEquipment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["equipments"]);
      toast.success("Equipamento atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar equipamento.");
    },
  });

  // Mutation para deletar equipamento
  const deleteMutation = useMutation(deleteEquipment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["equipments"]);
      toast.success("Equipamento excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir equipamento.");
    },
  });

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    equipments: paginatedEquipments,
    totalEquipments: filteredEquipments.length,
    isLoading,
    error,
    createEquipment: createMutation.mutate,
    updateEquipment: updateMutation.mutate,
    deleteEquipment: deleteMutation.mutate,
    filter,
    setFilter,
    currentPage,
    equipmentsPerPage,
    paginate,
  };
};

export default useEquipments;
