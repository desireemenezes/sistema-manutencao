// Hook para gerar os dados de gráfico que mostram a quantidade de manutenções por tipo (corretiva, preventiva).
// Usa useMemo para memorizar o resultado do reduce e do mapeamento,
// evitando recálculo a cada renderização, a menos que os dados de manutenção mudem.

import { useMemo } from "react";
import { useMaintenanceList } from "@/api/maintenanceApi";
import type { MaintenanceType } from "@/types/Maintenance";

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
    return Object.keys(maintenanceTypes).map((type) => ({
      type,
      count: maintenanceTypes[type as MaintenanceType] ?? 0,
    }));
  }, [maintenanceTypes]);

  return chartData;
};
