import { useMemo } from "react";
import { useMaintenanceList } from "@/api/maintenanceApi";
import type { MaintenanceType } from "@/types/Maintenance";

const LABELS_PT_BR: Record<MaintenanceType, string> = {
  corrective: "Corretiva",
  preventive: "Preventiva",
};

export const useMaintenanceTypesChartData = () => {
  const { data: maintenanceRequests } = useMaintenanceList();

  const maintenanceTypes = useMemo(() => {
    if (!maintenanceRequests) return null;

    return maintenanceRequests.reduce(
      (acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      },
      { corrective: 0, preventive: 0 } as { [key in MaintenanceType]: number }
    );
  }, [maintenanceRequests]);

  const chartData = useMemo(() => {
    if (!maintenanceTypes) return [];
    return (Object.keys(maintenanceTypes) as MaintenanceType[]).map((type) => ({
      type: LABELS_PT_BR[type],
      count: maintenanceTypes[type] ?? 0,
    }));
  }, [maintenanceTypes]);

  return chartData;
};
