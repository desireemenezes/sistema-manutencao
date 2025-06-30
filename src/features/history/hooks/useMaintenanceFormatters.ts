import { useMemo } from "react";
import type { Maintenance } from "../types/Maintenance";

const statusLabels = {
  open: "Aberto",
  in_progress: "Em progresso",
  completed: "Concluído",
} as const;

const typeLabels = {
  corrective: "Corretiva",
  preventive: "Preventiva",
} as const;

export function useMaintenanceFormatters(maintenances: Maintenance[] = []) {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("pt-BR");
  };

  const getStatusLabel = (status: keyof typeof statusLabels | string) =>
    statusLabels[status as keyof typeof statusLabels] || status;

  const getTypeLabel = (type: keyof typeof typeLabels | string) =>
    typeLabels[type as keyof typeof typeLabels] || type;

  const exportCSV = useMemo(() => {
    return () => {
      if (maintenances.length === 0) {
        alert("Nenhuma manutenção para exportar.");
        return;
      }

      const headers = ["ID", "Descrição", "Tipo", "Data Conclusão", "Status"];
      const rows = maintenances.map((m) => [
        m.id,
        m.description,
        getTypeLabel(m.type),
        formatDate(m.completionDate),
        getStatusLabel(m.status),
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers, ...rows]
          .map((row) =>
            row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
          )
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.href = encodedUri;
      link.download = "historico_manutencoes.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }, [maintenances]);

  return {
    formatDate,
    getStatusLabel,
    getTypeLabel,
    exportCSV,
  };
}
