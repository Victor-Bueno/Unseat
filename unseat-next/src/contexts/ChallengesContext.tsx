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
    activeChallenge: Challenge
    levelUp: () => void,
    startNewChallenge: () => void,
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

    const levelUp = () => {
        setLevel((previousState) => previousState + 1);
    }

    const startNewChallenge = () => {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex] as Challenge;

        setActiveChallenge(challenge);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExp,
                completedChallenges,
                activeChallenge,
                levelUp,
                startNewChallenge
            }}>
            {props.children}
        </ChallengesContext.Provider>
    );
}