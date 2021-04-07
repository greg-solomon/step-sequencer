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
  togglePlayback: () => void;
  toggleNote: (newNote: number, trackName: string) => void;
  resetPlayback: () => void;
  isPlaying: boolean;
  currentStep: any;
  timePerSequence: number;
  totalTime: number;
}

const Context = React.createContext<ContextState>(null);

const Provider: React.FC = ({ children }) => {
  const [sequenceLength, setSequenceLength] = React.useState(16);
  const [tracks, setTracks] = React.useState(drums);
  const [pastLapsedTime, setPastLapse] = React.useState(0);
  const [bpm, setBpm] = React.useState(120);
  const [currentStep, setCurrentStep] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const isPlaying = startTime !== null;
  const playerTime = useTimer(isPlaying);

  const lapsedTime = isPlaying ? Math.max(0, playerTime - startTime) : 0;
  const totalTime = pastLapsedTime + lapsedTime;
  const timePerSequence = (BASE_BPM_PER_SEC / bpm) * 1000 * sequenceLength;
  const timePerStep = timePerSequence / sequenceLength;

  React.useEffect(() => {
    if (isPlaying) {
      setCurrentStep(Math.floor(totalTime / timePerStep) % sequenceLength);
    } else {
      setCurrentStep(null);
    }
  }, [startTime, timePerStep, totalTime, sequenceLength]);

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

  const togglePlayback = () => {
    if (isPlaying) {
      setPastLapse((l) => l + performance.now() - startTime);
      setStartTime(null);
    } else {
      setStartTime(performance.now());
    }
  };

  const resetPlayback = () => {
    setStartTime(null);
    setPastLapse(0);
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
        currentStep,
        togglePlayback,
        totalTime,
        timePerSequence,
        resetPlayback,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { Context, Provider };
