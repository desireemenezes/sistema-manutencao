import { Section } from "@/components/Section/Section";
import CreateUser from "../components/CreateUser/CreateUser";

export function UserForm() {
  return (
    <Section
      title="Novo Usuário"
      description="Bem-vindo ao painel de controle."
    >
      <CreateUser />
    </Section>
  );
}
