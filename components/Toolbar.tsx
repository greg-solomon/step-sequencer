import React from "react";
import styles from "../styles/Toolbar.module.scss";
import { Button } from "./ui/Button";
import { FaStop, FaPlay } from "react-icons/fa";
import { NumberInput } from "./ui/NumberInput";
import { GREEN, MAX_BPM, MIN_BPM, RED } from "../lib/constants/constants";
import { Context } from "../lib/hooks/Context";

export const Toolbar: React.FC = () => {
  const { bpmState, sequenceLength, setSequenceLength } = React.useContext(
    Context
  );
  const [bpm, setBpm] = bpmState;
  return (
    <div className={styles.container}>
      <div></div>
      <div>
        <Button>
          <FaStop color={RED} />
        </Button>
        <Button>
          <FaPlay color={GREEN} />
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
