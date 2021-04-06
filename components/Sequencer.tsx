import React, { SetStateAction } from "react";
import { Dispatch } from "react";
import { ITrack } from "../lib/constants/drums";
import styles from "../styles/Sequencer.module.scss";
import { Toolbar } from "./Toolbar";
import { TrackList } from "./TrackList";

export interface SequencerProps {}

export const Sequencer: React.FC<SequencerProps> = (props) => {
  return (
    <div className={styles.container}>
      <Toolbar />
      <TrackList />
    </div>
  );
};
