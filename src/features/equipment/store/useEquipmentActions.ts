import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateEquipment, deleteEquipment } from "../api/equipments";
import { toast } from "react-toastify";
import { useEquipmentStore } from "./useEquipmentStore";
import type { Equipment } from "../types/Equipment";

export const useEquipmentActions = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const queryClient = useQueryClient();
  const updateEquipmentInStore = useEquipmentStore(
    (state) => state.updateEquipmentInStore
  );
  const removeEquipmentFromStore = useEquipmentStore(
    (state) => state.removeEquipmentFromStore
  );

  // Mutation para atualizar equipamento
  const updateMutation = useMutation(updateEquipment, {
    onSuccess: (updated) => {
      // Atualiza localmente a store
      updateEquipmentInStore(updated);
      // Invalida cache da API
      queryClient.invalidateQueries(["equipments"]);
      toast.success("Equipamento atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar equipamento.");
    },
  });

  // Mutation para deletar equipamento
  const deleteMutation = useMutation(deleteEquipment, {
    onSuccess: (_, id) => {
      // Remove localmente da store
      removeEquipmentFromStore(id);
      // Invalida cache da API
      queryClient.invalidateQueries(["equipments"]);
      toast.success("Equipamento excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir equipamento.");
    },
  });

  const openEdit = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedEquipment(null);
  };

  const openDelete = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setSelectedEquipment(null);
  };

  const confirmEdit = (updatedEquipment: Equipment) => {
    updateMutation.mutate(updatedEquipment);
    closeEdit();
  };

  const confirmDelete = () => {
    if (selectedEquipment && selectedEquipment.id) {
      deleteMutation.mutate(selectedEquipment.id);
      closeDelete();
    }
  };

  return {
    selectedEquipment,
    isEditOpen,
    isDeleteOpen,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    confirmEdit,
    confirmDelete,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
  };
};
