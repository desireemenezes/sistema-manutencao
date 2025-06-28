import type {
  CreateMaintenanceRequest,
  MaintenanceType,
} from "@/types/Maintenance";
import { useState } from "react";

type FormData = Omit<
  CreateMaintenanceRequest,
  | "id"
  | "status"
  | "assignedTo"
  | "completionDate"
  | "completionNotes"
  | "partsUsed"
> & {
  type?: MaintenanceType | ""; // Permite string vazia temporariamente para o select
  sectorId?: number | "";
  equipmentId?: number | "";
  assignedTo: null;
};

export const useCreateMaintenanceForm = () => {
  const [formData, setFormData] = useState<FormData>({
    type: "", // inicialmente vazio para o select
    priority: "",
    description: "",
    relatedTo: "equipment",
    sectorId: "",
    equipmentId: "",
    assignedTo: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    const numericFields = ["sectorId", "equipmentId"];

    let formattedValue: string | number | undefined = value;

    if (numericFields.includes(name)) {
      formattedValue = value === "" ? undefined : Number(value);
    }

    // Para o campo "type", converta "" para undefined para evitar erro de tipo
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
    });
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
};
