import { Section } from "@/components/Section/Section";
import { MaintenanceList } from "../components/MaintenanceList";
import { MaintenanceFilters } from "../components/MaintenanceFilter/MaintenanceFilters";

export function Called() {
  return (
    <Section title="Chamados em manutenção" description="Gerencie os chamados.">
      <div>
        <MaintenanceFilters />
        <MaintenanceList />
      </div>
    </Section>
  );
}
