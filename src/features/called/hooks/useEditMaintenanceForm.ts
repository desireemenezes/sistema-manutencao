import type {
  MaintenanceRequest,
  MaintenanceStatus,
  PartUsed,
} from "@/types/Maintenance";
import { useState } from "react";

export const useEditMaintenanceForm = (maintenance: MaintenanceRequest) => {
  const [status, setStatus] = useState<MaintenanceStatus>(maintenance.status);
  const [completionDate, setCompletionDate] = useState(
    maintenance.completionDate || ""
  );
  const [completionNotes, setCompletionNotes] = useState(
    maintenance.completionNotes || ""
  );
  const [partsUsed, setPartsUsed] = useState<PartUsed[]>(
    maintenance.partsUsed.length > 0
      ? maintenance.partsUsed
      : [{ name: "", quantity: 1 }]
  );

  const [errors, setErrors] = useState<{
    completionDate?: string;
    completionNotes?: string;
    parts?: string;
  }>({});

  const addPart = () => {
    setPartsUsed([...partsUsed, { name: "", quantity: 1 }]);
  };

  const removePart = (index: number) => {
    setPartsUsed(partsUsed.filter((_, i) => i !== index));
  };

  const updatePartName = (index: number, name: string) => {
    const updated = [...partsUsed];
    updated[index].name = name;
    setPartsUsed(updated);
  };

  const updatePartQuantity = (index: number, quantity: number) => {
    const updated = [...partsUsed];
    updated[index].quantity = quantity;
    setPartsUsed(updated);
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (status === "completed") {
      if (!completionDate) {
        newErrors.completionDate = "Data de execução obrigatória.";
      }
      if (!completionNotes.trim()) {
        newErrors.completionNotes = "Descrição do serviço obrigatória.";
      }
      const invalidParts = partsUsed.some(
        (part) => !part.name.trim() || part.quantity <= 0
      );
      if (invalidParts) {
        newErrors.parts =
          "Todas as peças devem ter nome preenchido e quantidade maior que 0.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    status,
    setStatus,
    completionDate,
    setCompletionDate,
    completionNotes,
    setCompletionNotes,
    partsUsed,
    addPart,
    removePart,
    updatePartName,
    updatePartQuantity,
    validate,
    errors,
  };
};
