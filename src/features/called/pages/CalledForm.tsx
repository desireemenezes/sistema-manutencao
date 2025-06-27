import { Section } from "@/components/Section/Section";
import { MaintenanceForm } from "../components/MaintenanceForm/MaintenanceForm";

export const CalledForm = () => {
  return (
    <Section
      title="Abrir Chamado"
      description="Preencha os campos para registrar um novo chamado de manutenção."
    >
      <MaintenanceForm />
    </Section>
  );
};
