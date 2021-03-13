import { createContext, ReactNode, useState } from "react";

interface ChallengeContextData {
    level: number,
    currentExp: number,
    completedChallenges: number,
    levelUp: () => void,
    startNewChallenge: () => void
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

    const levelUp = () => {
        setLevel((previousState) => previousState + 1);
    }

    const startNewChallenge = () => {

    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExp,
                completedChallenges,
                levelUp,
                startNewChallenge
            }}>
            {props.children}
        </ChallengesContext.Provider>
    );
}