import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateEquipment, deleteEquipment } from "../api/equipments";
import { toast } from "react-toastify";
import type { Equipment } from "../types/Equipment";

export const useEquipmentActions = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateEquipment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["equipments"]);
      toast.success("Equipamento atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar equipamento.");
    },
  });

  const deleteMutation = useMutation(deleteEquipment, {
    onSuccess: () => {
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
    if (selectedEquipment) {
      deleteMutation.mutate(selectedEquipment.id as number);
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
  };
};
