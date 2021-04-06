import React, { SetStateAction } from "react";
import { Dispatch } from "react";
import { BASE_BPM_PER_SEC } from "../constants/constants";
import { drums, ITrack } from "../constants/drums";
import { useTimer } from "./useTimer";
import { ToggleHandlers, useToggle } from "./useToggle";

interface ContextState {
  tracks: ITrack[];
  bpmState: [number, Dispatch<SetStateAction<number>>];
  sequenceLength: number;
  setSequenceLength: Dispatch<SetStateAction<number>>;
  toggleNote: (newNote: number, trackName: string) => void;
  isPlaying: boolean;
  playHandlers: ToggleHandlers;
}

const Context = React.createContext<ContextState>(null);

const Provider: React.FC = ({ children }) => {
  const [sequenceLength, setSequenceLength] = React.useState(16);
  const [tracks, setTracks] = React.useState(drums);
  const [bpm, setBpm] = React.useState(120);
  const [currentStep, setCurrentStep] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [isPlaying, playHandlers] = useToggle();
  const playerTime = useTimer(isPlaying);

  const timePerSequence = (BASE_BPM_PER_SEC / bpm) * 1000 * sequenceLength;
  React.useEffect(() => {
    if (isPlaying) {
      // setCurrentStep()
    } else {
      setCurrentStep(null);
    }
  }, [isPlaying]);

  // handlers
  const toggleNote = (newNote: number, trackName: string) => {
    const track = tracks.filter((t) => t.name === trackName)[0];
    if (track.steps.includes(newNote)) {
      const newNotes = track.steps.filter((step) => step !== newNote);

      setTracks((prev) =>
        prev.map((track) => {
          if (track.name === trackName) {
            return {
              ...track,
              steps: newNotes,
            };
          }
          return track;
        })
      );
    } else {
      setTracks((prev) =>
        prev.map((track) => {
          if (track.name === trackName) {
            return {
              ...track,
              steps: [...track.steps, newNote],
            };
          }
          return track;
        })
      );
    }
  };

  return (
    <Context.Provider
      value={{
        tracks,
        sequenceLength,
        setSequenceLength,
        toggleNote,
        bpmState: [bpm, setBpm],
        isPlaying,
        playHandlers,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { Context, Provider };
