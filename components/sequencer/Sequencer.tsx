import React from "react";
import { Context } from "../../lib/hooks/Context";
import styles from "../../styles/Sequencer.module.scss";
import { PlayIndicator } from "./PlayIndicator";
import { Toolbar } from "./Toolbar";
import TrackList from "./TrackList";

export const Sequencer: React.FC = () => {
  const { togglePlayback, isPlaying } = React.useContext(Context);
  const [isMousePressed, setMousePressed] = React.useState(false);
  const widthRef = React.useRef(null);

  React.useEffect(() => {
    window.addEventListener("keypress", handlePressSpaceBar);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("keypress", handlePressSpaceBar);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPlaying]);

  const handlePressSpaceBar = (e: KeyboardEvent) => {
    // if not space bar
    if (e.key !== " ") return;
    togglePlayback();
  };

  const handleMouseDown = () => {
    setMousePressed(true);
  };

  const handleMouseUp = () => {
    setMousePressed(false);
  };

  return (
    <div className={styles.container}>
      <Toolbar />
      <PlayIndicator widthRef={widthRef} />
      <TrackList ref={widthRef} isMousePressed={isMousePressed} />
    </div>
  );
};
