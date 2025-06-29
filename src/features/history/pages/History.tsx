import { Section } from "@/components/Section/Section";
import MaintenanceHistory from "../components/MaintenanceHistory";

export function History() {
  return (
    <Section title="Histórico" description="Todos os históricos.">
      <MaintenanceHistory />
    </Section>
  );
}
