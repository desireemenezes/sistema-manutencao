import { useState } from "react";
import { toast } from "react-toastify";
import { loginRequest } from "../api/loginRequest";
import { useAuth } from "@/hooks/useAuth";

export function useLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginRequest({ email, password });
      login(user);
      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      const message = "Credenciais inválidas. Verifique seu e-mail e senha.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    loading,
    handleSubmit,
  };
}
