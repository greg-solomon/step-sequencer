import React, { MutableRefObject } from "react";
import { Context } from "../../lib/hooks/Context";
import styles from "../../styles/PlayIndicator.module.scss";

interface PlayIndicatorProps {
  widthRef: MutableRefObject<HTMLDivElement>;
}
export const PlayIndicator: React.FC<PlayIndicatorProps> = React.memo(
  ({ widthRef }) => {
    const { totalTime, timePerSequence } = React.useContext(Context);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
      if (widthRef.current) {
        let progress = Math.min(
          (totalTime % timePerSequence) / timePerSequence,
          1
        );

        const noteWidth = widthRef.current.scrollWidth * 0.82;
        ref.current.style.transform = `translate3d(${(
          progress * noteWidth
        ).toFixed(2)}px, 0, 0px)`;

        ref.current.style.height = `${widthRef.current.scrollHeight}px`;
      }
    }, [timePerSequence, totalTime]);

    return <div className={styles.container} ref={ref}></div>;
  }
);
