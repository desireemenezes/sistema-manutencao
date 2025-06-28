import { useMaintenanceList } from "@/api/maintenanceApi";

export const useMaintenanceStats = () => {
  const { data: maintenanceRequests, isLoading } = useMaintenanceList();

  const openRequests = maintenanceRequests?.filter(
    (item) => item.status === "open"
  );
  const inProgressRequests = maintenanceRequests?.filter(
    (item) => item.status === "in_progress"
  );
  const completedRequests = maintenanceRequests?.filter(
    (item) => item.status === "completed"
  );

  return {
    openRequests,
    inProgressRequests,
    completedRequests,
    isLoading,
  };
};
