import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateSector, deleteSector } from "../api/sectors";
import { toast } from "react-toastify";
import type { Sector } from "../types/Sector";

export const useSectorActions = () => {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateSector, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sectors"]);
      toast.success("Setor atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar setor.");
    },
  });

  const deleteMutation = useMutation(deleteSector, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sectors"]);
      toast.success("Setor deletado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir setor.");
    },
  });

  const openEdit = (sector: Sector) => {
    setSelectedSector(sector);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedSector(null);
  };

  const openDelete = (sector: Sector) => {
    setSelectedSector(sector);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setSelectedSector(null);
  };

  const confirmEdit = (updatedSector: Sector) => {
    updateMutation.mutate(updatedSector);
    closeEdit();
  };

  const confirmDelete = () => {
    if (selectedSector) {
      deleteMutation.mutate(selectedSector.id as number);
      closeDelete();
    }
  };

  return {
    selectedSector,
    isEditOpen,
    isDeleteOpen,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    confirmEdit,
    confirmDelete,
  };
};
