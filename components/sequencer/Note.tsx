import React from "react";
import styles from "../../styles/Note.module.scss";

interface NoteProps {
  active: boolean;
  isCurrent: boolean;
  play: () => void;
  onClick: () => void;
  isMousePressed: boolean;
}

export const Note: React.FC<NoteProps> = React.memo(
  ({ active, onClick, isCurrent, play, isMousePressed }) => {
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

    const handleMouseOver: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (isMousePressed) {
        onClick();
      }
    };

    return (
      <div
        className={className}
        onMouseDown={onClick}
        onMouseOver={handleMouseOver}
      />
    );
  }
);
