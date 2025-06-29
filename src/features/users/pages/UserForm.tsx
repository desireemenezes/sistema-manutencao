import { Section } from "@/components/Section/Section";
import CreateUser from "../components/CreateUser/CreateUser";

export function UserForm() {
  return (
    <Section title="Novo Usuário" description="Cadastre um novo usuário.">
      <CreateUser />
    </Section>
  );
}
