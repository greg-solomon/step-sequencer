import React from "react";
import { ITrack } from "../constants/drums";
import { Context } from "./Context";
import useSound from "./useSound";

const useTrack = (track: ITrack) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = React.useState(1);
  const [play] = useSound(track.file, volume);
  const [showOptionsPopover, togglePopover] = React.useState(false);

  return {
    audioRef,
    volume,
    setVolume,
    play,
    showOptionsPopover,
    togglePopover,
  };
};

export { useTrack };
