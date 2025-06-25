import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../LoginForm";
import * as loginService from "../../services/loginRequest";
import { useAuthStore } from "../../store/authStore";

// Mock do serviço de login
jest.mock("../../services/loginRequest");

describe("LoginForm", () => {
  beforeEach(() => {
    // Limpar store antes de cada teste para garantir estado limpo
    useAuthStore.getState().logout();
  });

  it("exibe mensagem de erro ao inserir credenciais inválidas", async () => {
    (loginService.loginRequest as jest.Mock).mockRejectedValueOnce(
      new Error("Credenciais inválidas")
    );

    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText(/e-mail/i),
      "wrong@user.com"
    );
    await userEvent.type(screen.getByPlaceholderText(/senha/i), "wrongpass");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      const element = screen.queryByText(/e-mail ou senha inválidos/i);
      expect(element).not.toBeNull();
    });
  });

  it("faz login e atualiza o estado global com usuário correto", async () => {
    const fakeUser = {
      id: 1,
      fullName: "Alice Researcher",
      email: "alice@station.com",
      password: "123456",
      role: "researcher",
    };
    (loginService.loginRequest as jest.Mock).mockResolvedValueOnce(fakeUser);

    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText(/e-mail/i),
      fakeUser.email
    );
    await userEvent.type(
      screen.getByPlaceholderText(/senha/i),
      fakeUser.password
    );
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.user).toEqual(fakeUser);
    });
  });
});
