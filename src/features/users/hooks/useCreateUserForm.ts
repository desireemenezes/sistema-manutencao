import { useState } from "react";
import type { User } from "@/types/Auth";
import useUsers from "../store/useUsers";

interface Errors {
  fullName?: string;
  email?: string;
  role?: string;
  password?: string;
}

export const useCreateUserForm = () => {
  const { createUser } = useUsers();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "" as User["role"] | "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    if (!formData.role) newErrors.role = "Perfil é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (onSuccess?: () => void) => {
    if (!validate()) return;

    try {
      await createUser({
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role as User["role"],
        password: formData.password,
      });

      setFormData({ fullName: "", email: "", role: "", password: "" });
      onSuccess?.();
    } catch {
      // Erro tratado via toast
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};
