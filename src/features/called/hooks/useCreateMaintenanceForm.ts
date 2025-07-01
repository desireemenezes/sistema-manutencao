import type {
  CreateMaintenanceRequest,
  MaintenanceType,
} from "@/types/Maintenance";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // Importando hook para pegar os dados de autenticação

type FormData = Omit<
  CreateMaintenanceRequest,
  "id" | "status" | "completionDate" | "completionNotes" | "partsUsed"
> & {
  type?: MaintenanceType | ""; // permite string vazia temporariamente para select
  sectorId?: number | "";
  equipmentId?: number | "";
  assignedTo: number | null;
  requesterId: number; // obrigatório
};

export const useCreateMaintenanceForm = () => {
  const { user } = useAuth(); // Pegando o usuário logado
  const [formData, setFormData] = useState<FormData>({
    type: "",
    priority: "",
    description: "",
    relatedTo: "equipment",
    sectorId: "",
    equipmentId: "",
    assignedTo: null,
    requesterId: user?.id || 0, // Preenchendo com o ID do usuário logado
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    const numericFields = ["sectorId", "equipmentId", "assignedTo"];

    let formattedValue: string | number | undefined = value;

    if (numericFields.includes(name)) {
      formattedValue = value === "" ? undefined : Number(value);
    }

    if (name === "type" && value === "") {
      formattedValue = undefined;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const resetForm = () => {
    setFormData({
      type: "",
      priority: "",
      description: "",
      relatedTo: "equipment",
      sectorId: "",
      equipmentId: "",
      assignedTo: null,
      requesterId: user?.id || 0, // Preenchendo com o ID do usuário logado
    });
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
};
