import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import styles from '../styles/pages/Home.module.css';
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ChallengeBox from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number,
  currentExp: number,
  completedChallenges: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExp={props.currentExp}
      completedChallenges={props.completedChallenges}
    >
      <div className={styles.container}>
        <Head>
          <title>Home | Unseat</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExp, completedChallenges } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExp: Number(currentExp),
      completedChallenges: Number(completedChallenges)
    }
  }
}
