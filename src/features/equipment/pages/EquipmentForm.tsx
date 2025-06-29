import { Section } from "@/components/Section/Section";
import CreateEquipment from "../components/CreateEquipment/CreateEquipment";

export function EquipmentForm() {
  return (
    <Section title="Equipamentos" description="Cadastro de equipamento.">
      <CreateEquipment />
    </Section>
  );
}
