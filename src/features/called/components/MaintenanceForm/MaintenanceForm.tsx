import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateMaintenanceForm } from "@/features/called/hooks/useCreateMaintenanceForm";
import { useCreateMaintenanceRequest } from "@/features/called/hooks/useCreateMaintenanceRequest";
import { useTechnicians } from "@/api/useTechnicians";
import useEquipments from "@/features/equipment/store/useEquipments";
import styles from "./MaintenanceForm.module.scss";
import { useSectorsHook } from "@/features/sectors/hooks/useSectorsHook";

export const MaintenanceForm = () => {
  const { formData, handleChange, resetForm } = useCreateMaintenanceForm();
  const navigate = useNavigate();
  const { data: technicians = [] } = useTechnicians();
  const { data: sectors = [] } = useSectorsHook();
  const { equipments = [] } = useEquipments();

  const { mutate: createMaintenance } = useCreateMaintenanceRequest({
    onSuccessCallback: () => {
      resetForm();
      navigate("/chamados");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.type ||
      !formData.priority ||
      !formData.description ||
      !formData.sectorId ||
      (formData.relatedTo === "equipment" && !formData.equipmentId)
    ) {
      toast.warn("Preencha todos os campos obrigatórios.");
      return;
    }

    createMaintenance(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Tipo de manutenção:
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Selecione</option>
          <option value="corrective">Corretiva</option>
          <option value="preventive">Preventiva</option>
        </select>
      </label>

      <label>
        Prioridade:
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
        >
          <option value="">Selecione</option>
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
      </label>

      <label>
        Descrição:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Relacionado a:
        <select
          name="relatedTo"
          value={formData.relatedTo}
          onChange={handleChange}
        >
          <option value="equipment">Equipamento</option>
          <option value="location">Local</option>
        </select>
      </label>

      <label>
        Setor:
        <select
          name="sectorId"
          value={formData.sectorId ?? ""}
          onChange={handleChange}
          required
        >
          <option value="">Selecione</option>
          {sectors.map((sector) => (
            <option key={sector.id} value={sector.id}>
              {sector.name}
            </option>
          ))}
        </select>
      </label>

      {formData.relatedTo === "equipment" && (
        <label>
          Equipamento:
          <select
            name="equipmentId"
            value={formData.equipmentId ?? ""}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {equipments.map((equipment) => (
              <option key={equipment.id} value={equipment.id}>
                {equipment.name} ({equipment.code})
              </option>
            ))}
          </select>
        </label>
      )}

      <label>
        Atribuir ao agente:
        <select
          name="assignedTo"
          value={formData.assignedTo ?? ""}
          onChange={handleChange}
        >
          <option value="">Não atribuir</option>
          {technicians.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.fullName}
            </option>
          ))}
        </select>
      </label>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          className={styles.cancel}
          type="button"
          onClick={() => navigate("/chamados")}
        >
          Voltar
        </button>
        <button type="submit" className={styles.save}>
          Criar Chamado
        </button>
      </div>
    </form>
  );
};
