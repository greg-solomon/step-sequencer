import React, { ChangeEvent } from "react";
import { FaPlay } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { GREEN } from "../lib/constants/constants";
import { ITrack } from "../lib/constants/drums";
import { Context } from "../lib/hooks/Context";
import useSound from "../lib/hooks/useSound";
import styles from "../styles/TrackList.module.scss";
import { Note } from "./Note";
import { Button } from "./ui/Button";

interface TrackProps {
  track: ITrack;
  length: number;
}

export const Track: React.FC<TrackProps> = ({ track, length }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [play] = useSound(track.file);
  const [showOptionsPopover, togglePopover] = React.useState(false);
  const { toggleNote, currentStep, sequenceLength } = React.useContext(Context);
  const [enteredTrackName, setEnteredTrackName] = React.useState(track.name);

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
        <div className={styles.trackControls}>
          <audio ref={audioRef}>
            <source src={track.file}></source>
            Your browser doesn't support the audio tag
          </audio>
          <Button onClick={playSample}>
            <FaPlay color={GREEN} />
          </Button>

          <Button onClick={() => togglePopover(!showOptionsPopover)}>
            <FiMoreVertical color="white" />
          </Button>
        </div>
        {track.name}
        {showOptionsPopover && (
          <Dropdown
            trackName={enteredTrackName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEnteredTrackName(e.target.value)
            }
          />
        )}
      </div>
      <div className={styles.trackSteps}>{notes}</div>
    </div>
  );
};

interface DropdownProps {
  trackName: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ trackName, onChange }) => {
  return (
    <div className={styles.options}>
      <div className={styles.formRow}>
        <label htmlFor="trackname">Name</label>
        <input type="text" value={trackName} onChange={(e) => onChange(e)} />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="trackUpload">Change Sound</label>
        <input type="file" name="trackUpload" />
      </div>

      {/*  VOLUME, FILE */}
      <Button>Save</Button>
    </div>
  );
};
