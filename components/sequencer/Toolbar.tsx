import React from "react";
import styles from "../../styles/Toolbar.module.scss";
import { Button } from "../ui/Button";
import { FaStop, FaPlay, FaPause } from "react-icons/fa";
import { NumberInput } from "../ui/NumberInput";
import { GREEN, MAX_BPM, MIN_BPM, RED } from "../../lib/constants/constants";
import { Context } from "../../lib/hooks/Context";

export const Toolbar: React.FC = () => {
  const {
    bpmState,
    togglePlayback,
    resetPlayback,
    isPlaying,
  } = React.useContext(Context);
  const [bpm, setBpm] = bpmState;
  return (
    <div className={styles.container}>
      <div></div>
      <div>
        <Button onClick={resetPlayback}>
          <FaStop color={RED} />
        </Button>

        <Button onClick={togglePlayback}>
          {!isPlaying && <FaPlay color={GREEN} />}
          {isPlaying && <FaPause color="white" />}
        </Button>
        <NumberInput
          label="BPM"
          dispatch={setBpm}
          value={bpm}
          min={MIN_BPM}
          max={MAX_BPM}
        />
      </div>
    </div>
  );
};
