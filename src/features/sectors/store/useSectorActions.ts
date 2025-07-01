import { useState } from "react";
import { toast } from "react-toastify";
import type { Sector } from "../types/Sector";
import { useSectorStore } from "./useSectorStore"; // Zustand para manipulação local

export const useSectorActions = () => {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { addSector, updateSectorLocal, deleteSectorLocal } = useSectorStore();

  // Função para criar setor localmente
  const confirmCreate = (newSector: Omit<Sector, "id">) => {
    const newSectorWithId = { ...newSector, id: Date.now() }; // Gerar ID único localmente
    addSector(newSectorWithId); // Adiciona o setor ao estado do Zustand
    toast.success("Setor criado com sucesso!");
  };

  // Função para editar setor localmente
  const confirmEdit = (updatedSector: Sector) => {
    updateSectorLocal(updatedSector); // Atualiza o setor localmente
    toast.success("Setor atualizado com sucesso!");
    setIsEditOpen(false);
    setSelectedSector(null);
  };

  // Função para excluir setor localmente
  const confirmDelete = () => {
    if (selectedSector) {
      deleteSectorLocal(selectedSector.id); // Exclui o setor localmente
      toast.success("Setor deletado com sucesso!");
      setIsDeleteOpen(false);
      setSelectedSector(null);
    }
  };

  // Funções para abrir e fechar modais
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

  return {
    selectedSector,
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
