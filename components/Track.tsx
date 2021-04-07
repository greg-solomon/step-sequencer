import React from "react";
import { FaPlay } from "react-icons/fa";
import { GREEN } from "../lib/constants/constants";
import { ITrack } from "../lib/constants/drums";
import { Context } from "../lib/hooks/Context";
import { useSequence } from "../lib/hooks/useSequence";
import useSound from "../lib/hooks/useSound";
import styles from "../styles/TrackList.module.scss";
import { Note } from "./Note";

interface TrackProps {
  track: ITrack;
  length: number;
}

export const Track: React.FC<TrackProps> = ({ track, length }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [play] = useSound(track.file);
  const { toggleNote, currentStep, sequenceLength } = React.useContext(Context);

  const playSample = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const notes = [...Array(sequenceLength)].map((el, i) => {
    const isActive = track.steps.indexOf(i) !== -1;
    const isNoteOnCurrentStep = currentStep === i;

    return (
      <Note
        active={isActive}
        key={`${track.name}_${i}`}
        onClick={() => toggleNote(i, track.name)}
        isCurrent={isNoteOnCurrentStep}
        play={play}
      />
    );
  });
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
      <div className={styles.trackSteps}>{notes}</div>
    </div>
  );
};
