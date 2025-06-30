import type {
  CreateMaintenanceRequest,
  MaintenanceType,
} from "@/types/Maintenance";
import { useState } from "react";

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
  const [formData, setFormData] = useState<FormData>({
    type: "",
    priority: "",
    description: "",
    relatedTo: "equipment",
    sectorId: "",
    equipmentId: "",
    assignedTo: null,
    requesterId: 0, // ou coloque user.id, se disponível no contexto
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
      requesterId: 0, // sempre presente
    });
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
};
