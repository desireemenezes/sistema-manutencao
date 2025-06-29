import { useNavigate } from "react-router-dom";
import styles from "./CreateEquipment.module.scss";
import { useCreateEquipmentForm } from "../../hooks/useCreateEquipmentForm";

const CreateEquipment = () => {
  const navigate = useNavigate();
  const { formData, errors, handleChange, handleSubmit } =
    useCreateEquipmentForm();

  const renderFieldError = (field: keyof typeof errors) =>
    errors[field] ? <div className={styles.error}>{errors[field]}</div> : null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(() => navigate("/equipamentos"));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form} noValidate>
        <label>
          Nome:
          <input
            type="text"
            value={formData.name}
            onChange={handleChange("name")}
            className={errors.name ? styles.invalid : ""}
            autoComplete="off"
          />
          {renderFieldError("name")}
        </label>

        <label>
          Código:
          <input
            type="text"
            value={formData.code}
            onChange={handleChange("code")}
            className={errors.code ? styles.invalid : ""}
            autoComplete="off"
          />
          {renderFieldError("code")}
        </label>

        <label>
          Modelo:
          <input
            type="text"
            value={formData.model}
            onChange={handleChange("model")}
            className={errors.model ? styles.invalid : ""}
            autoComplete="off"
          />
          {renderFieldError("model")}
        </label>

        <label>
          Setor:
          <select
            value={formData.sectorId}
            onChange={handleChange("sectorId")}
            className={errors.sectorId ? styles.invalid : ""}
          >
            <option value="">Selecione um setor</option>
            {/* Aqui você deve mapear seus setores reais */}
            <option value="1">Laboratório</option>
            <option value="2">Produção</option>
            <option value="3">Qualidade</option>
          </select>
          {renderFieldError("sectorId")}
        </label>

        <label>
          Próxima Data Preventiva:
          <input
            type="date"
            value={formData.nextPreventiveDate || ""}
            onChange={handleChange("nextPreventiveDate")}
            className={errors.nextPreventiveDate ? styles.invalid : ""}
          />
          {renderFieldError("nextPreventiveDate")}
        </label>

        <label>
          Notas:
          <textarea
            value={formData.notes || ""}
            onChange={handleChange("notes")}
            className={errors.notes ? styles.invalid : ""}
            rows={3}
          />
          {renderFieldError("notes")}
        </label>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => navigate("/equipamentos")}
            className={styles.cancel}
          >
            Voltar
          </button>
          <button type="submit" className={styles.confirm}>
            Criar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEquipment;
