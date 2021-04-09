import React from "react";
import { Context } from "../../lib/hooks/Context";
import { Track } from "./Track";
import styles from "../../styles/TrackList.module.scss";

interface TrackListProps {
  isMousePressed: boolean;
}
const TrackList = React.forwardRef<HTMLDivElement, TrackListProps>(
  ({ isMousePressed }, ref) => {
    const { tracks } = React.useContext(Context);
    return (
      <div className={styles.container} ref={ref}>
        {tracks.map((track) => (
          <Track
            track={track}
            key={track.name}
            isMousePressed={isMousePressed}
          />
        ))}
      </div>
    );
  }
);

export default React.memo(TrackList);
