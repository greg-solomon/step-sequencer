import React, { Dispatch, SetStateAction } from "react";
import styles from "./styles/BPMPicker.module.scss";

type BaseProps = React.InputHTMLAttributes<HTMLInputElement>;

interface NumberInput extends BaseProps {
  label: string;
  dispatch: Dispatch<SetStateAction<number>>;
  max: number;
  min: number;
}

export const NumberInput: React.FC<NumberInput> = ({
  label,
  dispatch,
  max,
  min,
  ...props
}) => {
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
    dispatch((prev) => {
      const nextValue = prev - movementY;

      if (nextValue > max) return max;
      if (nextValue < min) return min;
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
    if (+event.target.value < min) {
      dispatch(10);
      return;
    }
    if (+event.target.value > max) {
      dispatch(522);
      return;
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    dispatch(+value);
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
