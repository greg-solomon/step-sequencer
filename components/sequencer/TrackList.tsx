import React from "react";
import { Context } from "../../lib/hooks/Context";
import { Track } from "./Track";
import styles from "../../styles/TrackList.module.scss";

export const TrackList = React.forwardRef<HTMLDivElement>(({}, ref) => {
  const { tracks } = React.useContext(Context);
  return (
    <div className={styles.container} ref={ref}>
      {tracks.map((track) => (
        <Track track={track} key={track.name} />
      ))}
    </div>
  );
});
