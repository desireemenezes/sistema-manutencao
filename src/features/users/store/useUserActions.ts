import { useState } from "react";
import { toast } from "react-toastify";
import type { User } from "@/types/Auth";
import { useUserStore } from "../store/userStore"; // Zustand para manipulação local

export const useUserActions = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { addUser, updateUser, deleteUser } = useUserStore(); // Zustand para usuários

  // Função para criar usuário localmente
  const confirmCreate = (newUser: Omit<User, "id">) => {
    const newUserWithId = { ...newUser, id: Date.now() }; // Gerar ID único localmente
    addUser(newUserWithId); // Adiciona o usuário ao estado do Zustand
    toast.success("Usuário criado com sucesso!");
  };

  // Função para editar usuário localmente
  const confirmEdit = (updatedUser: User) => {
    updateUser(updatedUser); // Atualiza o usuário localmente
    toast.success("Usuário atualizado com sucesso!");
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  // Função para excluir usuário localmente
  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id); // Exclui o usuário localmente
      toast.success("Usuário deletado com sucesso!");
      setIsDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  // Funções para abrir e fechar modais
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

  return {
    selectedUser,
    isEditOpen,
    isDeleteOpen,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    confirmCreate, // Agora, cria apenas localmente
    confirmEdit, // Edita apenas localmente
    confirmDelete, // Exclui apenas localmente
  };
};
