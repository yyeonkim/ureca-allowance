import styles from "@/styles/Error.module.css";

function ErrorMessage({ message }) {
  return message ? <span className={styles.error}>{message}</span> : null;
}

export default ErrorMessage;
