import { useState, useRef, type FormEvent } from "react";
import styles from "./CreateSectorForm.module.scss";

interface CreateSectorFormProps {
  onCreate: (data: { name: string; category?: string }) => void;
}

const CreateSectorForm = ({ onCreate }: CreateSectorFormProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("O nome do setor é obrigatório.");
      nameInputRef.current?.focus();
      return;
    }

    setError("");
    onCreate({ name: name.trim(), category: category.trim() || undefined });
    setName("");
    setCategory("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="sector-name" className="sr-only">
        Nome do novo setor
      </label>
      <input
        id="sector-name"
        type="text"
        ref={nameInputRef}
        placeholder="Nome do novo setor"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        aria-invalid={!!error}
        aria-describedby={error ? "name-error" : undefined}
      />

      <label htmlFor="sector-category" className="sr-only">
        Categoria (opcional)
      </label>
      <input
        id="sector-category"
        type="text"
        placeholder="Categoria (opcional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button
        type="submit"
        aria-label="Adicionar novo setor"
        disabled={!name.trim()}
      >
        + Adicionar Setor
      </button>

      {error && (
        <p id="name-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
};

export default CreateSectorForm;
