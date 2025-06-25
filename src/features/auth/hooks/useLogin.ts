import { useState } from "react";
import { toast } from "react-toastify";
import { loginRequest } from "../services/loginRequest";
import { useAuth } from "./useAuth";

export function useLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginRequest({ email, password });
      login(user);
      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      let message =
        error.response?.data?.message ||
        "Erro ao tentar fazer login. Por favor, tente novamente.";

      // Verifica se o erro indica usuário não encontrado
      if (
        message.toLowerCase().includes("usuário não encontrado") ||
        message.toLowerCase().includes("user not found")
      ) {
        message =
          "Usuário não encontrado. Entre em contato com o administrador.";
      }

      setError(message);
      toast.error(message);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    handleSubmit,
  };
}
