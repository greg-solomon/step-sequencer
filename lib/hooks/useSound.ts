import React from "react";
import Sound from "../utils/Sound";
import { useAnalyzer } from "./AnalyzerContext";
import { Context } from "./Context";

const useSound = (soundFilePath: string, volume: number = 1) => {
  const [sound, setSound] = React.useState<Sound>(null);
  const { audioCtx } = React.useContext(Context);
  const { analyzer } = useAnalyzer();
  const play = React.useCallback(() => sound.play(volume), [sound, volume]);

  React.useEffect(() => {
    if (audioCtx && !sound && analyzer) {
      setSound(new Sound(soundFilePath, audioCtx, analyzer));
    }
  }, [soundFilePath, audioCtx, analyzer]);

  return [play];
};

export default useSound;
