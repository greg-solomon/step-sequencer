import React from "react";
import styles from "../styles/InvalidMessage.module.scss";
interface InvalidBrowserMessageProps {}

export const InvalidBrowserMessage: React.FC<InvalidBrowserMessageProps> = ({}) => {
  return (
    <main className={styles.container}>
      <div>
        <h2>Incompatible Browser</h2>
        <p>Sorry, you're going to need to use a desktop to view this site!</p>
      </div>
    </main>
  );
};
