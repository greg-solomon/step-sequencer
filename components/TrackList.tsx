import React from "react";
import { Context } from "../lib/hooks/Context";
import styles from "../styles/TrackList.module.scss";
import { Track } from "./Track";

export const TrackList = React.forwardRef<HTMLDivElement>(({}, ref) => {
  const { tracks, sequenceLength } = React.useContext(Context);
  return (
    <div className={styles.container} ref={ref}>
      {tracks.map((track) => (
        <Track track={track} key={track.name} length={sequenceLength} />
      ))}
    </div>
  );
});
