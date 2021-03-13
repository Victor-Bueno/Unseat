import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

import challenges from "../../challenges.json";
import LevelUpModal from "../components/LevelUpModal";

type Challenge = {
    type: 'body' | 'eye',
    description: string,
    amount: number,
}

interface ChallengeContextData {
    level: number,
    currentExp: number,
    completedChallenges: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
}

export const ChallengesContext = createContext({} as ChallengeContextData);

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currentExp: number,
    completedChallenges: number,
}

export function ChallengesProvider(props: ChallengesProviderProps) {
    const [level, setLevel] = useState<number>(props.level ?? 1);
    const [currentExp, setCurrentExp] = useState<number>(props.currentExp ?? 0);
    const [completedChallenges, setCompletedChallenges] = useState<number>(props.completedChallenges ?? 0);
    const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
    const [isLevelUpModalOpne, setIfLevelUpModalIsOpen] = useState<boolean>(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExp', String(currentExp));
        Cookies.set('completedChallenges', String(completedChallenges));
    }, [level, currentExp, completedChallenges]);

    const closeLevelUpModal = () => setIfLevelUpModalIsOpen(false);

    const levelUp = () => {
        setLevel((previousState) => previousState + 1);
        setIfLevelUpModalIsOpen(true);
    }

    const startNewChallenge = () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex] as Challenge;

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();
        if (Notification.permission === "granted") {
            new Notification(`Novo desafio ${challenge.type == "body" ? "💪" : "👀"}`, {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    const resetChallenge = () => {
        setActiveChallenge(null);
    }

    const completeChallenge = () => {
        if (!activeChallenge) return;

        const { amount } = activeChallenge;

        let finalExp = currentExp + amount;
        if (finalExp >= experienceToNextLevel) {
            finalExp = finalExp - experienceToNextLevel;
            levelUp();
        }

        setCurrentExp(finalExp);
        setActiveChallenge(null);
        setCompletedChallenges((previousState) => previousState + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExp,
                completedChallenges,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }}>
            {props.children}
            {isLevelUpModalOpne && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}