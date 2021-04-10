import React from "react";
import Head from "next/head";
import { Sequencer } from "../components/sequencer/Sequencer";
import styles from "../styles/Home.module.scss";
import { useDevice } from "../lib/hooks/useDevice";
import { InvalidBrowserMessage } from "../components/InvalidBrowserMessage";
import { Visualizer } from "../components/visualizer/Visualizer";

export default function Home() {
  const isValidDevice = useDevice();

  if (!isValidDevice) {
    return <InvalidBrowserMessage />;
  }

  return (
    <>
      <Head>
        <title>React Step Sequencer</title>
      </Head>
      <main className={styles.main}>
        <Visualizer />
        <Sequencer />
      </main>
    </>
  );
}
