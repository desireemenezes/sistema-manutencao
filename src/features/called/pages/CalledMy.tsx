import { Section } from "@/components/Section/Section";
import { MyCalled } from "../components/Mycalled/MyCalled";

export function CalledMy() {
  return (
    <Section
      title="Meus chamados"
      description="Bem-vindo ao painel de controle."
    >
      <div>
        <MyCalled />
      </div>
    </Section>
  );
}
