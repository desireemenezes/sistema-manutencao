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
      <h2 className={styles.title}>Login</h2>
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
        autoComplete="email"
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
        autoComplete="current-password"
      />

      <button
        type="submit"
        disabled={loading}
        className={styles.button}
        aria-busy={loading}
      >
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
