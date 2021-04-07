import React, { MutableRefObject } from "react";
import { Context } from "../lib/hooks/Context";
import styles from "../styles/PlayIndicator.module.scss";

interface PlayIndicatorProps {
  trackRef: MutableRefObject<HTMLDivElement>;
}
export const PlayIndicator: React.FC<PlayIndicatorProps> = ({ trackRef }) => {
  const { totalTime, timePerSequence } = React.useContext(Context);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (trackRef.current) {
      let progress = Math.min(
        (totalTime % timePerSequence) / timePerSequence,
        1
      );

      const noteWidth = trackRef.current.scrollWidth * 0.82;
      ref.current.style.transform = `translate3d(${(
        progress * noteWidth
      ).toFixed(2)}px, 0, 0px)`;
    }
  }, [timePerSequence, totalTime]);

  return <div className={styles.container} ref={ref}></div>;
};
