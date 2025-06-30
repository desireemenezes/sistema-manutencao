import { useNavigate } from "react-router-dom";
import styles from "./CreateUser.module.scss";
import { useCreateUserForm } from "../../hooks/useCreateUserForm";

const CreateUser = () => {
  const navigate = useNavigate();
  const { formData, errors, handleChange, handleSubmit } = useCreateUserForm();

  const renderFieldError = (field: keyof typeof errors) =>
    errors[field] ? <div className={styles.error}>{errors[field]}</div> : null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(() => navigate("/usuarios"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <label>
          Nome:
          <input
            type="text"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            className={errors.fullName ? styles.invalid : ""}
          />
          {renderFieldError("fullName")}
        </label>

        <label>
          E-mail:
          <input
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            className={errors.email ? styles.invalid : ""}
          />
          {renderFieldError("email")}
        </label>

        <label>
          Perfil:
          <select
            value={formData.role}
            onChange={handleChange("role")}
            className={errors.role ? styles.invalid : ""}
          >
            <option value="">Selecione um perfil</option>
            <option value="manager">Gerente</option>
            <option value="technician">Técnico</option>
            <option value="researcher">Pesquisador</option>
          </select>
          {renderFieldError("role")}
        </label>

        <label>
          Senha:
          <input
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
            className={errors.password ? styles.invalid : ""}
          />
          {renderFieldError("password")}
        </label>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => navigate("/usuarios")}
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

export default CreateUser;
