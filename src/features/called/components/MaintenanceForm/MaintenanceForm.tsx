import { useNavigate } from "react-router-dom";
import styles from "./MaintenanceForm.module.scss";
import { useCreateMaintenanceForm } from "../../hooks/useCreateMaintenanceForm";
import { useCreateMaintenanceRequest } from "../../hooks/useCreateMaintenanceRequest";
import { toast } from "react-toastify";
import { useTechnicians } from "@/api/useTechnicians";
import { useSectors } from "@/features/sectors/hooks/useSectors";

export const MaintenanceForm = () => {
  const { formData, handleChange, resetForm } = useCreateMaintenanceForm();
  const navigate = useNavigate();

  const { data: technicians = [] } = useTechnicians();
  const { data: sectors = [] } = useSectors();

  const mutation = useCreateMaintenanceRequest({
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

    mutation.mutate(formData);
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
          <input
            type="number"
            name="equipmentId"
            value={formData.equipmentId}
            onChange={handleChange}
            required
          />
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
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Salvando..." : "Criar Chamado"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/chamados")}
          disabled={mutation.isLoading}
        >
          Voltar
        </button>
      </div>
    </form>
  );
};
