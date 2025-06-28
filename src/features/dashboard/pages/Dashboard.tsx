import { Section } from "@/components/Section/Section";
import { ContentDash } from "../components/ContentDash";

export function Dashboard() {
  return (
    <Section title="Dashboard" description="Bem-vindo ao painel de controle.">
      <ContentDash />
    </Section>
  );
}
