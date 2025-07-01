import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  getSectors,
  createSector,
  updateSector,
  deleteSector,
} from "../api/sectors";
import { useSectorStore } from "./useSectorStore";
import type { Sector } from "../types/Sector";

const useSectors = () => {
  const {
    sectors,
    setSectors,
    filter,
    setFilter,
    currentPage,
    sectorsPerPage,
    setCurrentPage,
    addSector,
    updateSectorLocal,
    deleteSectorLocal,
  } = useSectorStore();

  const queryClient = useQueryClient();

  // Carrega os setores da API, mas só quando o estado local estiver vazio
  const { isLoading, error } = useQuery<Sector[]>(["sectors"], getSectors, {
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      if (sectors.length === 0) {
        setSectors(data); // Preenche o estado local apenas se estiver vazio
      }
    },
    enabled: sectors.length === 0, // Executa a query apenas se não houver setores locais
  });

  // Filtragem e paginação local em Zustand
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredSectors = sectors.filter((sector) =>
    sector.name.toLowerCase().includes(normalizedFilter)
  );
  const indexOfLast = currentPage * sectorsPerPage;
  const indexOfFirst = indexOfLast - sectorsPerPage;
  const paginatedSectors = filteredSectors.slice(indexOfFirst, indexOfLast);

  // Criação otimista (Atualiza o estado local)
  const createMutation = useMutation(createSector, {
    onMutate: (newSector: Omit<Sector, "id">) => {
      const tempId = Date.now();
      addSector({ ...newSector, id: tempId }); // Adiciona o setor localmente
    },
    onSuccess: (createdSector: Sector) => {
      updateSectorLocal(createdSector); // Atualiza o setor na lista local
      toast.success("Setor criado com sucesso!");
      queryClient.invalidateQueries(["sectors"]);
    },
    onError: () => {
      toast.error("Erro ao criar setor.");
      queryClient.invalidateQueries(["sectors"]);
    },
  });

  // Atualização otimista (Atualiza o setor local)
  const updateMutation = useMutation(updateSector, {
    onMutate: (updatedSector: Sector) => {
      updateSectorLocal(updatedSector); // Atualiza o setor localmente
    },
    onSuccess: () => {
      toast.success("Setor atualizado com sucesso!");
      queryClient.invalidateQueries(["sectors"]);
    },
    onError: () => {
      toast.error("Erro ao atualizar setor.");
      queryClient.invalidateQueries(["sectors"]);
    },
  });

  // Deleção otimista (Remove o setor local)
  const deleteMutation = useMutation(deleteSector, {
    onMutate: (id: number) => {
      deleteSectorLocal(id); // Remove o setor localmente
    },
    onSuccess: () => {
      toast.success("Setor deletado com sucesso!");
      queryClient.invalidateQueries(["sectors"]);
    },
    onError: () => {
      toast.error("Erro ao excluir setor.");
      queryClient.invalidateQueries(["sectors"]);
    },
  });

  const paginate = (page: number) => setCurrentPage(page);

  return {
    sectors: paginatedSectors,
    totalSectors: filteredSectors.length,
    isLoading,
    error,
    createSector: createMutation.mutate,
    updateSector: updateMutation.mutate,
    deleteSector: deleteMutation.mutate,
    filter,
    setFilter,
    currentPage,
    sectorsPerPage,
    paginate,
  };
};

export default useSectors;
