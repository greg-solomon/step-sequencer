import React from "react";
import styles from "../styles/Header.module.scss";
import { FaGithub } from "react-icons/fa";
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className={styles.header}>
      <h1>React Step Sequencer</h1>
      <a
        href="https://github.com/greg-solomon/step-sequencer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={28} />
      </a>
    </header>
  );
};
