import Spinner from "@/components/Spinner/Spinner";
import { useLogin } from "../hooks/useLogin";
import styles from "../styles/login.module.scss";

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    loading,
    handleSubmit,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h4 className={styles.title}>Login</h4>
      {error && <p className={styles.error}>{error}</p>}

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        required
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) setError("");
        }}
        required
        disabled={loading}
      />

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? (
          <>
            <Spinner size={20} ariaLabel="Carregando..." /> Carregando...
          </>
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
}
