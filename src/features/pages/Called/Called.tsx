import { Section } from "@/components/Section/Section";
import { MaintenanceListPage } from "@/features/maintenance/pages/MaintenanceListPage";

export function Called() {
  return (
    <Section
      title="Chamados em Manutenção"
      description="Bem-vindo ao painel de controle."
    >
      <MaintenanceListPage />
    </Section>
  );
}
