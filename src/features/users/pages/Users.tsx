import { Section } from "@/components/Section/Section";
import UserList from "../components/UserList/UserList";

export function Users() {
  return (
    <Section title="Usuarios" description="Bem-vindo ao painel de controle.">
      <UserList />
    </Section>
  );
}
