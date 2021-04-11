import React from "react";
import styles from "./Visualizer.module.scss";
import { Context } from "../../lib/hooks/Context";
import { useAnalyzer } from "../../lib/hooks/AnalyzerContext";
import { GREEN } from "../../lib/constants/constants";
import { Button } from "../ui/Button";

interface VisualizerProps {}

export const Visualizer: React.FC<VisualizerProps> = ({}) => {
  const { isPlaying, audioCtx, stopPlayback } = React.useContext(Context);
  const [showFrequencyGraph, setFrequencyGraph] = React.useState(false);
  const { analyzer } = useAnalyzer();
  const [canvasCtx, setCanvasCtx] = React.useState<CanvasRenderingContext2D>(
    null
  );
  const canvas = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvas.current) {
      setCanvasCtx(canvas.current.getContext("2d"));
      const parentWidth = canvas.current.parentElement.clientWidth;
      canvas.current.setAttribute("width", `${parentWidth}px`);
      canvas.current.height = 300;
    }
  }, [audioCtx]);

  React.useLayoutEffect(() => {
    if (!canvasCtx) return;
    if (!canvas.current) return;
    if (!analyzer) return;

    let drawFrame: number;
    canvasCtx.lineWidth = 1;

    const drawWaveForm = () => {
      drawFrame = requestAnimationFrame(drawWaveForm);
      analyzer.fftSize = 2048;
      const dataArray = new Uint8Array(analyzer.fftSize);
      canvasCtx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      analyzer.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = `#313131`;

      canvasCtx.strokeStyle = GREEN;

      canvasCtx.beginPath();

      var sliceWidth = canvas.current.width / dataArray.length;
      var x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        var v = dataArray[i] / 128.0;
        var y = (v * canvas.current.height) / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.current.width, canvas.current.height / 2);
      canvasCtx.stroke();
    };

    const drawFrequency = () => {
      drawFrame = requestAnimationFrame(drawFrequency);
      analyzer.fftSize = 256;
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);

      analyzer.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = "#212121";
      canvasCtx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      const barWidth = (canvas.current.width / dataArray.length) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i];
        canvasCtx.fillStyle = GREEN;
        canvasCtx.fillRect(
          x,
          canvas.current.height - barHeight,
          barWidth,
          barHeight
        );
        x += barWidth;
      }
    };
    if (isPlaying) {
      if (showFrequencyGraph) {
        drawFrequency();
      } else {
        drawWaveForm();
      }
    }

    return () => {
      cancelAnimationFrame(drawFrame);
      canvasCtx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    };
  }, [canvasCtx, analyzer, showFrequencyGraph, isPlaying]);

  const handleWaveformSwitch = () => {
    setFrequencyGraph(false);
  };

  const handleFrequencySwitch = () => {
    setFrequencyGraph(true);
  };

  return (
    <div className={styles.canvasWrapper}>
      <div className={styles.canvasControls}>
        <button
          onClick={handleWaveformSwitch}
          style={{
            border: !showFrequencyGraph
              ? `1px solid ${GREEN}`
              : `1px solid gray`,
            color: !showFrequencyGraph ? GREEN : "white",
          }}
          className={styles.canvasBtn}
        >
          Waveform
        </button>
        <button
          onClick={handleFrequencySwitch}
          style={{
            border: showFrequencyGraph
              ? `1px solid ${GREEN}`
              : `1px solid gray`,
            color: showFrequencyGraph ? GREEN : "white",
          }}
          className={styles.canvasBtn}
        >
          Frequency
        </button>
      </div>
      <canvas ref={canvas} className={styles.canvas}></canvas>
    </div>
  );
};
