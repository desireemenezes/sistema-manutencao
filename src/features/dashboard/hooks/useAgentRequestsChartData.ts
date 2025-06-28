import { useMaintenanceList } from "@/api/maintenanceApi";
import { useTechnicians } from "@/api/useTechnicians";

export const useAgentRequestsChartData = () => {
  const { data: maintenanceRequests } = useMaintenanceList();
  const { data: technicians } = useTechnicians();

  if (!maintenanceRequests || !technicians) {
    return [];
  }

  // Agrupar os pedidos de manutenção por agente
  const agentRequests = maintenanceRequests.reduce((acc, item) => {
    if (item.assignedTo) {
      acc[item.assignedTo] = (acc[item.assignedTo] || 0) + 1;
    }
    return acc;
  }, {} as { [key: number]: number });

  // Encontrar os 3 agentes com mais pedidos
  const top2Agents = Object.keys(agentRequests)
    .sort((a, b) => agentRequests[Number(b)] - agentRequests[Number(a)])
    .slice(0, 3);

  // Gerar os dados do gráfico para os 2 agentes
  const chartData = top2Agents
    .map((agentId) => {
      const technician = technicians.find((t) => t.id === Number(agentId));
      return {
        // Exibir o primeiro nome do técnico
        agent: technician?.fullName.split(" ")[0],
        count: agentRequests[Number(agentId)],
      };
    })
    .filter((item) => item.agent !== undefined);

  return chartData;
};
