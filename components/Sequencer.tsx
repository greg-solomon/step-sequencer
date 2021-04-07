import React from "react";
import styles from "../styles/Sequencer.module.scss";
import { PlayIndicator } from "./PlayIndicator";
import { Toolbar } from "./Toolbar";
import { TrackList } from "./TrackList";

export const Sequencer: React.FC = () => {
  const widthRef = React.useRef(null);
  return (
    <div className={styles.container}>
      <Toolbar />
      <PlayIndicator widthRef={widthRef} />
      <TrackList ref={widthRef} />
    </div>
  );
};
