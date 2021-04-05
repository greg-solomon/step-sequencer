import React, { SetStateAction } from "react";
import { Dispatch } from "react";
import styles from "../styles/Sequencer.module.scss";
import { Toolbar } from "./Toolbar";
import { TrackList } from "./TrackList";
interface SequencerProps {
  bpmState: [number, Dispatch<SetStateAction<number>>];
}

export const Sequencer: React.FC<SequencerProps> = ({ bpmState }) => {
  return (
    <div className={styles.container}>
      <Toolbar bpmState={bpmState} />
      <TrackList />
    </div>
  );
};
