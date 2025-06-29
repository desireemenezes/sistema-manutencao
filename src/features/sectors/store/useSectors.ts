import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getSectors, createSector } from "../api/sectors";
import { useSectorStore } from "./useSectorStore";
import type { Sector } from "../types/Sector";

const useSectors = () => {
  const { filter, setFilter, currentPage, sectorsPerPage, setCurrentPage } =
    useSectorStore();
  const queryClient = useQueryClient();

  const {
    data: allSectors,
    isLoading,
    error,
  } = useQuery<Sector[]>(["sectors"], getSectors, {
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  const normalizedFilter = filter.toLowerCase();

  const filteredSectors =
    allSectors?.filter((sector) =>
      sector.name.toLowerCase().includes(normalizedFilter)
    ) ?? [];

  const indexOfLastSector = currentPage * sectorsPerPage;
  const indexOfFirstSector = indexOfLastSector - sectorsPerPage;
  const paginatedSectors = filteredSectors.slice(
    indexOfFirstSector,
    indexOfLastSector
  );

  const createMutation = useMutation(createSector, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sectors"]);
      toast.success("Setor criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar setor.");
    },
  });

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    sectors: paginatedSectors,
    totalSectors: filteredSectors.length,
    isLoading,
    error,
    createSector: createMutation.mutate,
    filter,
    setFilter, // <-- ADICIONADO AQUI
    currentPage,
    sectorsPerPage,
    paginate,
  };
};

export default useSectors;
