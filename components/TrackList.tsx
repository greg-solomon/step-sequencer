import React, { useContext } from "react";
import { drums, DrumSample } from "../lib/constants/drums";
import { Context } from "../lib/context/Context";
import styles from "../styles/TrackList.module.scss";

interface TrackListProps {}

interface TrackProps {
  drum: DrumSample;
}

export const TrackList: React.FC<TrackListProps> = ({}) => {
  const content = drums.map((drum) => <Track drum={drum} key={drum.name} />);
  return <div className={styles.container}>{content}</div>;
};

const Track: React.FC<TrackProps> = ({ drum }) => {
  const { sequenceLength } = useContext(Context);
  const allSteps = new Array(sequenceLength);
  console.log(allSteps);
  return (
    <div>
      <p>{drum.name}</p>
      <audio>
        <source src={drum.file} type="audio/wav" />
        Your browser does not support the audio element
      </audio>
      <div>
        {allSteps.map((step, i) => (
          <div key={i}></div>
        ))}
      </div>
    </div>
  );
};
