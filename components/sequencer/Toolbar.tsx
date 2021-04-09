import React from "react";
import styles from "../../styles/Toolbar.module.scss";
import { Button } from "../ui/Button";
import { FaStop, FaPlay, FaPause } from "react-icons/fa";
import { NumberInput } from "../ui/NumberInput";
import { GREEN, MAX_BPM, MIN_BPM, RED } from "../../lib/constants/constants";
import { Context } from "../../lib/hooks/Context";

export const Toolbar: React.FC = React.memo(() => {
  const context = React.useContext(Context);
  const [bpm, setBpm] = context.bpmState;
  return (
    <div className={styles.container}>
      <div>
        <Button onClick={context.clearNotes}>Clear</Button>
      </div>
      <div>
        <Button onClick={context.resetPlayback}>
          <FaStop color={RED} />
        </Button>

        <Button onClick={context.togglePlayback}>
          {!context.isPlaying && <FaPlay color={GREEN} />}
          {context.isPlaying && <FaPause color="white" />}
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
});
