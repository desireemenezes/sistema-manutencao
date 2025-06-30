// Hook que gera os dados para gráfico dos técnicos com mais manutenções atribuídas.
// Usa useMemo para agrupar os dados e calcular os top 3 técnicos somente quando
// os dados de manutenção ou técnicos mudarem, evitando cálculos desnecessários em renderizações.

import { useMemo } from "react";
import { useMaintenanceList } from "@/api/maintenanceApi";
import { useTechnicians } from "@/api/useTechnicians";

export const useAgentRequestsChartData = () => {
  const { data: maintenanceRequests } = useMaintenanceList();
  const { data: technicians } = useTechnicians();

  const chartData = useMemo(() => {
    if (!maintenanceRequests || !technicians) {
      return [];
    }

    // Agrupa os pedidos de manutenção por agente
    const agentRequests = maintenanceRequests.reduce((acc, item) => {
      if (item.assignedTo) {
        acc[item.assignedTo] = (acc[item.assignedTo] || 0) + 1;
      }
      return acc;
    }, {} as { [key: number]: number });

    // Seleciona os 3 agentes com mais pedidos
    const top3Agents = Object.keys(agentRequests)
      .sort((a, b) => agentRequests[Number(b)] - agentRequests[Number(a)])
      .slice(0, 3);

    // Mapeia os dados para o formato do gráfico, com o primeiro nome do técnico e contagem
    return top3Agents
      .map((agentId) => {
        const technician = technicians.find((t) => t.id === Number(agentId));
        return {
          agent: technician?.fullName.split(" ")[0],
          count: agentRequests[Number(agentId)],
        };
      })
      .filter((item) => item.agent !== undefined);
  }, [maintenanceRequests, technicians]);

  return chartData;
};
