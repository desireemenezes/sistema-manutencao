// src/features/equipments/store/useEquipments.ts
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getEquipments, createEquipment } from "../api/equipments";
import { useEquipmentStore } from "./useEquipmentStore";
import type { Equipment } from "../types/Equipment";

const useEquipments = () => {
  const { filter, setFilter, currentPage, equipmentsPerPage, setCurrentPage } =
    useEquipmentStore();
  const queryClient = useQueryClient();

  const {
    data: allEquipments,
    isLoading,
    error,
  } = useQuery<Equipment[]>(["equipments"], getEquipments, {
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

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

  const createMutation = useMutation(createEquipment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["equipments"]);
      toast.success("Equipamento criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar equipamento.");
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
    filter,
    setFilter,
    currentPage,
    equipmentsPerPage,
    paginate,
  };
};

export default useEquipments;
