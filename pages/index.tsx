import Head from "next/head";
import { useState } from "react";
import { Sequencer } from "../components/Sequencer";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [bpm, setBpm] = useState(120);
  return (
    <>
      <Head>
        <title>React Step Sequencer</title>
      </Head>
      <main className={styles.main}>
        <Sequencer bpmState={[bpm, setBpm]} />
      </main>
    </>
  );
}
