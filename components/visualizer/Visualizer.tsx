import React from "react";
import styles from "./Visualizer.module.scss";
import { Context } from "../../lib/hooks/Context";
import { useAnalyzer } from "../../lib/hooks/AnalyzerContext";
import { GREEN } from "../../lib/constants/constants";

interface VisualizerProps {}

export const Visualizer: React.FC<VisualizerProps> = ({}) => {
  const { isPlaying, audioCtx } = React.useContext(Context);
  const { analyzer } = useAnalyzer();
  const [canvasCtx, setCanvasCtx] = React.useState<CanvasRenderingContext2D>(
    null
  );
  const canvas = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvas.current) {
      setCanvasCtx(canvas.current.getContext("2d"));
    }
  }, [audioCtx]);

  React.useLayoutEffect(() => {
    if (!canvasCtx) return;
    if (!canvas.current) return;
    if (!analyzer) return;
    analyzer.fftSize = 2048;

    const dataArray = new Uint8Array(analyzer.fftSize);
    let drawFrame;
    const draw = () => {
      drawFrame = requestAnimationFrame(draw);
      canvasCtx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      analyzer.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = `#313131`;

      canvasCtx.lineWidth = 1;
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

    if (isPlaying) {
      draw();
    } else {
      cancelAnimationFrame(drawFrame);
    }
  }, [canvasCtx, isPlaying, analyzer]);

  return <canvas ref={canvas} className={styles.canvas}></canvas>;
};