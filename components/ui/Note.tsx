import React from "react";
import styles from "./styles/Note.module.scss";

interface NoteProps {
  active: boolean;
  onClick: () => void;
}

export const Note: React.FC<NoteProps> = ({ active, onClick }) => {
  return (
    <div
      className={active ? styles.activeNote : styles.note}
      onClick={onClick}
    />
  );
};
