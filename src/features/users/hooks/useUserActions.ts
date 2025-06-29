import { useState } from "react";
import type { User } from "@/types/Auth";
import { useMutation, useQueryClient } from "react-query";
import { updateUser, deleteUser } from "../api/users";
import { toast } from "react-toastify";

export const useUserActions = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Usuário atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar usuário.");
    },
  });

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      toast.error("Erro ao excluir usuário.");
    },
  });

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const openDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setSelectedUser(null);
  };

  const confirmEdit = (updatedUser: User) => {
    updateMutation.mutate(updatedUser);
    closeEdit();
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteMutation.mutate(selectedUser.id as number);
      closeDelete();
    }
  };

  return {
    selectedUser,
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
