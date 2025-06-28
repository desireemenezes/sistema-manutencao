import { useMaintenanceList } from "@/api/maintenanceApi";
import type { MaintenanceType } from "@/types/Maintenance";

export const useMaintenanceTypesChartData = () => {
  const { data: maintenanceRequests } = useMaintenanceList();

  const maintenanceTypes = maintenanceRequests?.reduce(
    (acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    },
    { corrective: 0, preventive: 0 } as { [key in MaintenanceType]: number }
  );

  const chartData = Object.keys(maintenanceTypes ?? {}).map((type) => ({
    type,
    count: maintenanceTypes?.[type as MaintenanceType] ?? 0,
  }));

  return chartData;
};
