import { useState } from "react";
import useEquipments from "../store/useEquipments";
import type { Equipment } from "../types/Equipment";

interface Errors {
  name?: string;
  code?: string;
  model?: string;
  sectorId?: string;
  nextPreventiveDate?: string;
  notes?: string;
}

export const useCreateEquipmentForm = () => {
  const { createEquipment } = useEquipments();

  const [formData, setFormData] = useState<Omit<Equipment, "id">>({
    name: "",
    code: "",
    model: "",
    sectorId: 0,
    nextPreventiveDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange =
    (field: keyof typeof formData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const value =
        field === "sectorId" ? Number(e.target.value) : e.target.value;
      setFormData({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.code.trim()) newErrors.code = "Código é obrigatório";
    if (!formData.sectorId) newErrors.sectorId = "Setor é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (onSuccess?: () => void) => {
    if (!validate()) return;

    try {
      await createEquipment(formData);
      setFormData({
        name: "",
        code: "",
        model: "",
        sectorId: 0,
        nextPreventiveDate: "",
        notes: "",
      });
      onSuccess?.();
    } catch {
      // tratar erro (ex: toast)
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};
