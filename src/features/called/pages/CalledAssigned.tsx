import { Section } from "@/components/Section/Section";
import { useAuth } from "@/hooks/useAuth";
import { useMaintenanceStore } from "../store/useMaintenanceStore";
import { useEffect } from "react";
import { MaintenanceList } from "../components/MaintenanceList";

export function CalledAssigned() {
  const { user } = useAuth();
  const { setAssignedToFilter } = useMaintenanceStore();

  useEffect(() => {
    if (user?.id) {
      setAssignedToFilter(user.id); // aplica o filtro do agente autenticado
    }
  }, [user?.id, setAssignedToFilter]);

  return (
    <Section
      title="Chamados atribuídos"
      description="Visualize os chamados sob sua responsabilidade."
    >
      <MaintenanceList />
    </Section>
  );
}
