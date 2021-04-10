import React from "react";

const useAudioContext = () => {
  const [audioCtx, setAudioCtx] = React.useState(null);

  React.useEffect(() => {
    const AudioContext =
      window.AudioContext ||
      (<any>window).webkitAudioContext ||
      (<any>window).MozAudioContext;

    setAudioCtx(new AudioContext());
  }, []);

  return audioCtx;
};

export { useAudioContext };
