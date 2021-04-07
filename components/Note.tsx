import React from "react";
import styles from "../styles/Note.module.scss";

interface NoteProps {
  active: boolean;
  isCurrent: boolean;
  play: () => void;
  onClick: () => void;
}

export const Note: React.FC<NoteProps> = ({
  active,
  onClick,
  isCurrent,
  play,
}) => {
  const className =
    active && isCurrent
      ? styles.currentNote
      : active
      ? styles.activeNote
      : styles.note;

  React.useEffect(() => {
    if (active && isCurrent) {
      play();
    }
  }, [active, isCurrent, play]);

  return <div className={className} onClick={onClick} />;
};
