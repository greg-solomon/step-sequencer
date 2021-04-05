import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "../styles/Toolbar.module.scss";
import { Button } from "./ui/Button";
import { FaStop, FaPlay } from "react-icons/fa";
import { BPMPicker } from "./ui/BPMPicker";
interface ToolbarProps {
  bpmState: [number, Dispatch<SetStateAction<number>>];
}

export const Toolbar: React.FC<ToolbarProps> = ({ bpmState }) => {
  const [bpm, setBpm] = bpmState;
  const handleBpmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBpm(+e.target.value);
  };
  return (
    <div className={styles.container}>
      <Button>
        <FaStop color="#dc3545" />
      </Button>
      <Button>
        <FaPlay color="#28a745" />
      </Button>
      <BPMPicker value={bpm} bpmState={bpmState} label="BPM" />
    </div>
  );
};
