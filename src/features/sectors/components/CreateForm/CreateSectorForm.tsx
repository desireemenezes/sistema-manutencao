// components/CreateSectorForm/CreateSectorForm.tsx

import { useState, type FormEvent } from "react";
import styles from "./CreateSectorForm.module.scss";

interface CreateSectorFormProps {
  onCreate: (data: { name: string; category?: string }) => void;
}

const CreateSectorForm = ({ onCreate }: CreateSectorFormProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("O nome do setor é obrigatório.");
      return;
    }

    setError("");
    onCreate({ name: name.trim(), category: category.trim() || undefined });
    setName("");
    setCategory("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do novo setor"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Categoria (opcional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">+ Adicionar Setor</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default CreateSectorForm;
