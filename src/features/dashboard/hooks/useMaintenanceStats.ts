// Hook que retorna listas filtradas de manutenções com status "open", "in_progress" e "completed".
// Utiliza useMemo para memorizar cada lista filtrada, evitando filtragens repetidas quando os dados não mudam.

import { useMemo } from "react";
import { useMaintenanceList } from "@/api/maintenanceApi";

export const useMaintenanceStats = () => {
  const { data: maintenanceRequests, isLoading } = useMaintenanceList();

  const openRequests = useMemo(() => {
    return maintenanceRequests?.filter((item) => item.status === "open") ?? [];
  }, [maintenanceRequests]);

  const inProgressRequests = useMemo(() => {
    return (
      maintenanceRequests?.filter((item) => item.status === "in_progress") ?? []
    );
  }, [maintenanceRequests]);

  const completedRequests = useMemo(() => {
    return (
      maintenanceRequests?.filter((item) => item.status === "completed") ?? []
    );
  }, [maintenanceRequests]);

  return {
    openRequests,
    inProgressRequests,
    completedRequests,
    isLoading,
  };
};
