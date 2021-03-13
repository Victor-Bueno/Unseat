import { createContext, ReactNode, useState } from "react";
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
    resetChallenge: () => void
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

    const levelUp = () => {
        setLevel((previousState) => previousState + 1);
    }

    const startNewChallenge = () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex] as Challenge;

        setActiveChallenge(challenge);
    }

    const resetChallenge = () => {
        setActiveChallenge(null);
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
                resetChallenge
            }}>
            {props.children}
        </ChallengesContext.Provider>
    );
}