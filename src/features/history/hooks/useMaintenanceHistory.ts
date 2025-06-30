import { useQuery } from "react-query";
import { getMaintenanceRequests } from "../api/maintenance";
import { useMaintenanceStore } from "../store/useMaintenance";
import type { Maintenance } from "../types/Maintenance";

export const useMaintenanceHistory = () => {
  const { filter, currentPage, maintenancesPerPage, setCurrentPage } =
    useMaintenanceStore();

  const {
    data: allMaintenances,
    isLoading,
    error,
  } = useQuery<Maintenance[]>("maintenanceRequests", getMaintenanceRequests, {
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
    keepPreviousData: true,
  });

  // Filtragem local
  const normalizedFilter = filter.toLowerCase();

  const filteredMaintenances =
    allMaintenances?.filter(
      (maintenance) =>
        maintenance.description.toLowerCase().includes(normalizedFilter) ||
        maintenance.type.toLowerCase().includes(normalizedFilter)
    ) ?? [];

  const indexOfLastMaintenance = currentPage * maintenancesPerPage;
  const indexOfFirstMaintenance = indexOfLastMaintenance - maintenancesPerPage;
  const paginatedMaintenances = filteredMaintenances.slice(
    indexOfFirstMaintenance,
    indexOfLastMaintenance
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    maintenances: paginatedMaintenances, // Certifique-se que isso é um array de Maintenance
    totalMaintenances: filteredMaintenances.length,
    isLoading,
    error,
    currentPage,
    maintenancesPerPage,
    paginate,
  };
};
