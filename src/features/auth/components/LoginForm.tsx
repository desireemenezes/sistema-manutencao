import { useLogin } from "../hooks/useLogin";
import styles from "../styles/login.module.scss";

export function LoginForm() {
  const {
    email,
    setEmail,
    setError,
    password,
    setPassword,
    error,
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
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
