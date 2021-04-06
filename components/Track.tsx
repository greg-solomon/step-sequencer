import React from "react";
import { FaPlay } from "react-icons/fa";
import { GREEN } from "../lib/constants/constants";
import { ITrack } from "../lib/constants/drums";
import { Context } from "../lib/hooks/Context";
import { useSequence } from "../lib/hooks/useSequence";
import styles from "../styles/TrackList.module.scss";
import { Note } from "./ui/Note";

interface TrackProps {
  track: ITrack;
  length: number;
}

export const Track: React.FC<TrackProps> = ({ track, length }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const sequence = useSequence(track.steps, length);

  const { toggleNote } = React.useContext(Context);

  const playSample = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className={styles.trackContainer}>
      <div className={styles.trackInfo}>
        {track.name}
        <audio ref={audioRef}>
          <source src={track.file}></source>
          Your browser doesn't support the audio tag
        </audio>
        <button onClick={playSample}>
          <FaPlay color={GREEN} />
        </button>
      </div>
      <div className={styles.trackSteps}>
        {sequence.map((isActive, i) => (
          <Note
            active={isActive}
            key={`${track.name}_${i}`}
            onClick={() => toggleNote(i, track.name)}
          />
        ))}
      </div>
    </div>
  );
};
