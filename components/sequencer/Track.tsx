import React, { ChangeEvent } from "react";
import { FaPlay } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { GREEN } from "../../lib/constants/constants";
import { ITrack } from "../../lib/constants/drums";
import { Context } from "../../lib/hooks/Context";
import { Note } from "./Note";
import { Button } from "../ui/Button";
import styles from "../../styles/TrackList.module.scss";
import useSound from "../../lib/hooks/useSound";

interface TrackProps {
  track: ITrack;
  isMousePressed: boolean;
}

export const Track: React.FC<TrackProps> = React.memo(
  ({ track, isMousePressed }) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = React.useState(1);
    const [play] = useSound(track.file, volume);
    const [showOptionsPopover, togglePopover] = React.useState(false);
    const dropdownRef = React.useRef();
    const {
      toggleNote,
      currentStep,
      sequenceLength,
      isPlaying,
      togglePlayback,
      stopPlayback,
    } = React.useContext(Context);

    React.useEffect(() => {
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
        play();
      }
    };

    const handleClickOff = (e: MouseEvent) => {
      if (e.target !== dropdownRef.current) {
        togglePopover(false);
      }
    };
    const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (isPlaying) {
        stopPlayback();
      }
      setVolume(+e.target.value / 100);
    };

    // CONTENT
    const notes: React.ReactElement[] = [];

    let noteSwitch = false;
    // get content for alternating note styles
    for (let i = 0; i < sequenceLength; i += 4) {
      notes.push(
        <div
          className={noteSwitch ? styles.offNotes : styles.onNotes}
          key={`${track.name}_notes_${i}`}
        >
          <Note
            active={track.steps.indexOf(i) !== -1}
            onClick={() => toggleNote(i, track.name)}
            isCurrent={currentStep === i}
            play={play}
            isMousePressed={isMousePressed}
          />
          <Note
            active={track.steps.indexOf(i + 1) !== -1}
            onClick={() => toggleNote(i + 1, track.name)}
            isCurrent={currentStep === i + 1}
            play={play}
            isMousePressed={isMousePressed}
          />
          <Note
            active={track.steps.indexOf(i + 2) !== -1}
            onClick={() => toggleNote(i + 2, track.name)}
            isCurrent={currentStep === i + 2}
            play={play}
            isMousePressed={isMousePressed}
          />
          <Note
            active={track.steps.indexOf(i + 3) !== -1}
            onClick={() => toggleNote(i + 3, track.name)}
            isCurrent={currentStep === i + 3}
            play={play}
            isMousePressed={isMousePressed}
          />
        </div>
      );
      noteSwitch = !noteSwitch;
    }

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
        <div className={styles.trackSteps}>
          {notes.map((noteBlock) => noteBlock)}
        </div>
      </div>
    );
  }
);

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
