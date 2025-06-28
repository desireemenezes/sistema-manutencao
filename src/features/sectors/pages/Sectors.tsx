import { Section } from "@/components/Section/Section";
import SectorList from "../components/SectorList";

export function Sectors() {
  return (
    <Section
      title="Setores"
      description="Controle de cadastro e edição de setores."
    >
      <SectorList />
    </Section>
  );
}
