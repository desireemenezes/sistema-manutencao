import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../LoginForm";
import * as loginService from "../../api/loginRequest";
import { useAuthStore } from "@/store/authStore";
import type { User } from "../../types/Auth";

const fakeUser: User = {
  id: 1,
  fullName: "Alice Researcher",
  email: "alice@station.com",
  role: "researcher",
};

// Mock do serviço de login
jest.mock("@/lib/env", () => ({
  env: {
    API_URL: "https://rest-json-server.onrender.com/",
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it("exibe mensagem de erro ao inserir credenciais inválidas", async () => {
    jest
      .spyOn(loginService, "loginRequest")
      .mockRejectedValueOnce(new Error("Credenciais inválidas"));

    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText(/e-mail/i),
      "wrong@user.com"
    );
    await userEvent.type(screen.getByPlaceholderText(/senha/i), "wrongpass");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    const errorMessage = await screen.findByText(
      /credenciais inválidas\. verifique seu e-mail e senha\./i
    );
    expect(errorMessage).not.toBeNull();
  });

  it("faz login e atualiza o estado global com usuário correto", async () => {
    // Mock para loginRequest aceitando email e password e retornando fakeUser
    jest
      .spyOn(loginService, "loginRequest")
      .mockImplementation(async ({ email, password }) => {
        if (email === fakeUser.email && password === "123456") {
          return Promise.resolve(fakeUser);
        } else {
          return Promise.reject(new Error("Credenciais inválidas"));
        }
      });

    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText(/e-mail/i),
      fakeUser.email
    );
    await userEvent.type(screen.getByPlaceholderText(/senha/i), "123456");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    // Espera o estado global ser atualizado
    await waitFor(() => {
      expect(useAuthStore.getState().user).toEqual(fakeUser);
    });
  });
});
