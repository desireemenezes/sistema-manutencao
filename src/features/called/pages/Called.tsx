import { Section } from "@/components/Section/Section";
import { MaintenanceFilters } from "../components/MaintenanceFilters";
import { MaintenanceList } from "../components/MaintenanceList";

export function Called() {
  return (
    <Section
      title="Chamados em manutenção"
      description="Bem-vindo ao painel de controle."
    >
      <div>
        <MaintenanceFilters />
        <MaintenanceList />
      </div>
    </Section>
  );
}
