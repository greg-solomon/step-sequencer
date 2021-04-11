type ITrack = {
  name: string;
  file: string;
  steps: number[];
};

const drums: ITrack[] = [
  {
    name: "Kick",
    file: "/sounds/kick.wav",
    steps: [0, 4, 8, 12],
  },
  {
    name: "Clap",
    file: "/sounds/clap.wav",
    steps: [4, 12],
  },
  {
    name: "Snare",
    file: "/sounds/snr.wav",
    steps: [4, 12],
  },
  {
    name: "Closed Hi Hat",
    file: "/sounds/closed_hat.wav",
    steps: [],
  },
  {
    name: "Cymbal",
    file: "/sounds/cymbal.wav",
    steps: [2, 6, 10, 14],
  },
];

export { drums };
export type { ITrack };
