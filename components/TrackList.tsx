import React from "react";
import { Context } from "../lib/hooks/Context";
import styles from "../styles/TrackList.module.scss";
import { Track } from "./Track";

export const TrackList: React.FC = ({}) => {
  const { tracks, sequenceLength } = React.useContext(Context);
  return (
    <div className={styles.container}>
      {tracks.map((track) => (
        <Track track={track} key={track.name} length={sequenceLength} />
      ))}
    </div>
  );
};
