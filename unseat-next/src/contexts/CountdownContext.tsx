import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import ChallengesContext from "./ChallengesContext";

interface CountdownContextData {
    minutes: number,
    seconds: number,
    isCounting: boolean,
    hasFinished: boolean,
    startCountdown: () => void,
    resetCountdown: () => void
}

export const CountdownContext = createContext({} as CountdownContextData);

interface CountdownProviderProps {
    children: ReactNode
}

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState<number>(25 * 60);
    const [isCounting, setIfItIsCounting] = useState<boolean>(false);
    const [hasFinished, setIfItHasFinished] = useState<boolean>(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const startCountdown = () => setIfItIsCounting(true);
    const resetCountdown = () => {
        clearTimeout(countdownTimeout);
        setIfItIsCounting(false);
        setTime(25 * 60);
        setIfItHasFinished(false);
    }

    useEffect(() => {
        if (isCounting && time > 0) {
            countdownTimeout = setTimeout(() => setTime((previousState) => previousState - 1), 1000);
        } else if (isCounting && time === 0) {
            setIfItHasFinished(true);
            setIfItIsCounting(false);
            startNewChallenge();
        }
    }, [isCounting, time]);

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            isCounting,
            hasFinished,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
}