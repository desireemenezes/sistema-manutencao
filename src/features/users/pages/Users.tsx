import { Section } from "@/components/Section/Section";
import UserList from "../components/UserList/UserList";

export function Users() {
  return (
    <Section
      title="Usuarios"
      description="Controle de cadastro e edição de usuários."
    >
      <UserList />
    </Section>
  );
}
