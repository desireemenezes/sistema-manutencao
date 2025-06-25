import { useState } from "react";
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
    } catch {
      setError("E-mail ou senha inválidos");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
