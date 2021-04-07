import React from "react";
import Head from "next/head";
import { Sequencer } from "../components/sequencer/Sequencer";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>React Step Sequencer</title>
      </Head>
      <main className={styles.main}>
        <Sequencer />
      </main>
    </>
  );
}
