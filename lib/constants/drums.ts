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
    file: "/sounds/snare.WAV",
    steps: [4, 12],
  },
  {
    name: "Closed Hi Hat",
    file: "/sounds/hi_hat.wav",
    steps: [0, 2, 4, 6, 8, 10, 12, 14],
  },
  {
    name: "Cymbal",
    file: "/sounds/cymbal_4.wav",
    steps: [0, 8],
  },
  {
    name: "Tom",
    file: "/sounds/tom.WAV",
    steps: [],
  },
];

export { drums };
export type { ITrack };
