import React from "react";

function useSequence(steps: number[], length: number) {
  const [sequence, setSequence] = React.useState([]);

  React.useEffect(() => {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      if (steps.includes(i)) {
        newSequence.push(true);
      } else {
        newSequence.push(false);
      }
    }
    setSequence(newSequence);
  }, [steps, length]);

  return sequence;
}

export { useSequence };
