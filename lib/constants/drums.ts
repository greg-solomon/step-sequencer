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
    file: "/sounds/snare.wav",
    steps: [4, 12],
  },
  {
    name: "Closed Hi Hat",
    file: "/sounds/closed_hat.wav",
    steps: [0, 2, 4, 6, 8, 10, 12, 14],
  },
  {
    name: "Cymbal",
    file: "/sounds/cymbal.wav",
    steps: [0, 8],
  },
];

export { drums };
export type { ITrack };
