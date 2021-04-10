// modified polyfill for sounds found in this repository -> https://github.com/joeshub/react-808/blob/master/src/utils/Sound.js
class Sound {
  audioContext: AudioContext;
  isSafariFixed: boolean;
  boundSafariFix: any;
  recorderNode: GainNode;
  buffer: any;
  path: string;
  analyzer: AnalyserNode;
  constructor(
    path: string,
    audioContext: AudioContext,
    analyzer: AnalyserNode
  ) {
    const isSafari =
      !!navigator.userAgent.match(/safari/i) &&
      !navigator.userAgent.match(/chrome/i) &&
      typeof document.body.style.webkitFilter !== "undefined";

    this.audioContext = audioContext;

    if (isSafari) {
      this.isSafariFixed = false;
      this.boundSafariFix = this.safariFix.bind(this);
      window.addEventListener("click", this.boundSafariFix, false);
    }
    if (!this.buffer) this.loadSound(path);
    this.analyzer = analyzer;
  }

  safariFix() {
    if (this.isSafariFixed) {
      (<any>window).removeEventListener("click", this.boundSafariFix, false);
      return;
    }
    // create empty buffer, connect to speakers and play the file
    var buffer = this.audioContext.createBuffer(1, 1, 22050);
    var source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
    this.isSafariFixed = true;
  }

  async loadSound(path: string) {
    this.recorderNode = this.audioContext.createGain();
    this.recorderNode.gain.value = 1;
    this.buffer = null;
    this.path = path;
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.decodeAudioDataAsync(
      this.audioContext,
      arrayBuffer
    );
    this.buffer = audioBuffer;
  }

  decodeAudioDataAsync(
    audioContext: AudioContext,
    arrayBuffer: ArrayBuffer
  ): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      audioContext.decodeAudioData(
        arrayBuffer,
        (buffer) => resolve(buffer),
        (e) => reject(e)
      );
    });
  }

  play(gainValue = 1, rateValue = 1) {
    this.audioContext.resume();
    const gain = this.audioContext.createGain();
    const sound = this.audioContext.createBufferSource();
    gain.gain.value = gainValue;
    sound.playbackRate.value = rateValue;
    sound.buffer = this.buffer;
    sound.connect(gain);
    sound.connect(this.analyzer);
    gain.connect(this.recorderNode);
    gain.connect(this.audioContext.destination);
    sound.start(0);
  }
}

export default Sound;
