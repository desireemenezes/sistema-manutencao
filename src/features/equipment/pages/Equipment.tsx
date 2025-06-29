import { Section } from "@/components/Section/Section";
import Equipments from "../components/Equipment";

export function Equipment() {
  return (
    <Section
      title="Equipamentos"
      description="Controle de cadastro e edição de equipamentos."
    >
      <Equipments />
    </Section>
  );
}
