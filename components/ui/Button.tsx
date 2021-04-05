import React from "react";
import styles from "./styles/Button.module.scss";
interface ButtonProps {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};
