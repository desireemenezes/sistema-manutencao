import { useQuery } from "react-query";
import { toast } from "react-toastify";
import {
  getSectors,
  createSector,
  updateSector,
  deleteSector,
} from "../api/sectors";
import type { Sector } from "../types/Sector";
import { useSectorStore } from "../store/useSectorStore";

const useSectors = () => {
  const {
    filter,
    setFilter,
    currentPage,
    sectorsPerPage,
    setCurrentPage,
    addSector,
    updateSectorLocal,
    deleteSectorLocal,
    setSectors,
    sectors,
  } = useSectorStore();

  // Carrega os setores da API e os armazena no Zustand
  const {
    data: allSectors,
    isLoading,
    error,
  } = useQuery<Sector[]>(["sectors"], getSectors, {
    staleTime: 1000 * 60 * 60, // Dados permanecem atualizados por 1 hora
    onSuccess: (data) => {
      if (data) {
        setSectors(data); // Armazena os dados no Zustand
      }
    },
  });

  // Filtragem e paginação local em Zustand
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredSectors =
    sectors?.filter((sector) =>
      sector.name.toLowerCase().includes(normalizedFilter)
    ) ?? [];

  const indexOfLast = currentPage * sectorsPerPage;
  const indexOfFirst = indexOfLast - sectorsPerPage;
  const paginatedSectors = filteredSectors.slice(indexOfFirst, indexOfLast);

  // Função para criar setor localmente e enviar para a API
  const createSectorHandler = async (newSector: Omit<Sector, "id">) => {
    try {
      const createdSector = await createSector(newSector); // Envia para API
      addSector(createdSector); // Atualiza localmente após sucesso
      toast.success("Setor criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar setor.");
    }
  };

  // Função para atualizar setor localmente e enviar para a API
  const updateSectorHandler = async (updatedSector: Sector) => {
    try {
      const updated = await updateSector(updatedSector); // Envia para API
      updateSectorLocal(updated); // Atualiza localmente após sucesso
      toast.success("Setor atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar setor.");
    }
  };

  // Função para deletar setor localmente e enviar para a API
  const deleteSectorHandler = async (id: number) => {
    try {
      await deleteSector(id); // Envia para API
      deleteSectorLocal(id); // Exclui localmente após sucesso
      toast.success("Setor deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar setor.");
    }
  };

  const paginate = (page: number) => setCurrentPage(page);

  return {
    sectors: paginatedSectors,
    totalSectors: filteredSectors.length,
    createSectorHandler,
    updateSectorHandler,
    deleteSectorHandler,
    filter,
    setFilter,
    currentPage,
    sectorsPerPage,
    paginate,
    isLoading,
    error,
  };
};

export default useSectors;
