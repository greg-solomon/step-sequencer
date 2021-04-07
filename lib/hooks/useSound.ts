import { useState, useEffect, useCallback } from "react";
import Sound from "../utils/Sound";

const useSound = (soundFilePath, volume = 1) => {
  const [sound, setSound] = useState<Sound>(null);
  const play = useCallback(() => sound.play(volume), [sound, volume]);

  useEffect(() => {
    setSound(new Sound(soundFilePath));
  }, [soundFilePath]);

  return [play];
};

export default useSound;
