import React, { Dispatch, SetStateAction } from "react";
import { MAX_BPM, MIN_BPM } from "../../lib/constants/constants";
import styles from "./styles/BPMPicker.module.scss";

type BaseProps = React.InputHTMLAttributes<HTMLInputElement>;

interface BPMPickerProps extends BaseProps {
  label: string;
  bpmState: [number, Dispatch<SetStateAction<number>>];
}

export const BPMPicker: React.FC<BPMPickerProps> = ({
  label,
  bpmState,
  ...props
}) => {
  const [bpm, setBpm] = bpmState;
  const [mouseDown, setMouseDown] = React.useState(false);

  React.useEffect(() => {
    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseDown]);

  const handleMouseMove = (e: MouseEvent) => {
    const { movementY } = e;
    setBpm((prev) => {
      const nextValue = prev - movementY;

      if (nextValue > MAX_BPM) return MAX_BPM;
      if (nextValue < MIN_BPM) return MIN_BPM;
      return nextValue;
    });
  };

  const handleMouseDown = () => {
    setMouseDown(true);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (+event.target.value < MIN_BPM) {
      setBpm(10);
      return;
    }
    if (+event.target.value > MAX_BPM) {
      setBpm(522);
      return;
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setBpm(+value);
  };

  return (
    <div className={styles.container}>
      <input
        type="number"
        {...props}
        onMouseDown={handleMouseDown}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label htmlFor={props.name}>{label}</label>
    </div>
  );
};
