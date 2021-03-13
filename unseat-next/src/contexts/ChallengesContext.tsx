import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";

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
}

const ChallengesContext = createContext({} as ChallengeContextData);
export default ChallengesContext;

interface ChallengesProviderProps {
    children: ReactNode
}

export function ChallengesProvider(props: ChallengesProviderProps) {
    const [level, setLevel] = useState<number>(1);
    const [currentExp, setCurrentExp] = useState<number>(0);
    const [completedChallenges, setCompletedChallenges] = useState<number>(0);
    const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    const levelUp = () => {
        setLevel((previousState) => previousState + 1);
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
                completeChallenge
            }}>
            {props.children}
        </ChallengesContext.Provider>
    );
}