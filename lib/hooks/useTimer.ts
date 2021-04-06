import React from "react";

const useTimer = (isPlaying: boolean) => {
  const [now, set] = React.useState(null);

  React.useLayoutEffect(() => {
    if (!isPlaying) {
      return;
    }

    const frame = requestAnimationFrame(() => set(performance.now()));

    return () => cancelAnimationFrame(frame);
  }, [isPlaying, now]);

  return isPlaying ? now : null;
};

export { useTimer };
