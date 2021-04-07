import React, { ChangeEvent, FormEvent } from "react";
import { FaPlay } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { GREEN } from "../../lib/constants/constants";
import { ITrack } from "../../lib/constants/drums";
import { Context } from "../../lib/hooks/Context";
import useSound from "../../lib/hooks/useSound";
import { Note } from "./Note";
import { Button } from "../ui/Button";
import styles from "../../styles/TrackList.module.scss";
import { useTrack } from "../../lib/hooks/useTrack";

interface TrackProps {
  track: ITrack;
}

export const Track: React.FC<TrackProps> = ({ track }) => {
  const {
    audioRef,
    play,
    setVolume,
    showOptionsPopover,
    volume,
    togglePopover,
  } = useTrack(track);
  const dropdownRef = React.useRef();
  const { toggleNote, currentStep, sequenceLength } = React.useContext(Context);

  React.useEffect(() => {
    console.log({ showOptionsPopover });
    if (showOptionsPopover) {
      window.addEventListener("click", handleClickOff);
    } else {
      window.removeEventListener("click", handleClickOff);
    }

    return () => {
      window.removeEventListener("click", handleClickOff);
    };
  }, [showOptionsPopover]);
  // HANDLERS
  const playSample = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleClickOff = (e: MouseEvent) => {
    if (e.target !== dropdownRef.current) {
      togglePopover(false);
    }
  };
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(+e.target.value / 100);
  };

  // CONTENT
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
        <p>{track.name}</p>
        {showOptionsPopover && (
          <Dropdown
            trackName={track.name}
            handleVolumeChange={handleVolumeChange}
            volume={volume}
            handleClose={() => togglePopover(false)}
            ref={dropdownRef}
          />
        )}
      </div>
      <div className={styles.trackSteps}>{notes}</div>
    </div>
  );
};

interface DropdownProps {
  trackName: string;
  volume: number;
  handleVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ trackName, handleVolumeChange, volume, handleClose }, ref) => {
    return (
      <div className={styles.options} ref={ref}>
        <h4>{trackName}</h4>
        <div className={styles.formRow}>
          <label htmlFor="trackUpload">Volume</label>
          <input
            type="range"
            name="volume"
            onChange={handleVolumeChange}
            value={volume * 100}
            min={0}
            max={100}
          />
        </div>
        <Button onClick={handleClose}>
          <MdClose />
        </Button>
      </div>
    );
  }
);
