import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

const Countdown = () => {
    const [time, setTime] = useState<number>(25 * 60);
    const [isCounting, setIfItIsCounting] = useState<boolean>(false);
    const [hasFinished, setIfItHasFinished] = useState<boolean>(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const separatedMinutes = String(minutes).padStart(2, "0").split("");
    const separatedSeconds = String(seconds).padStart(2, "0").split("");

    const startCountdown = () => setIfItIsCounting(true);
    const resetCountdown = () => {
        clearTimeout(countdownTimeout);
        setIfItIsCounting(false);
        setTime(25 * 60);
    }

    useEffect(() => {
        if (isCounting && time > 0) {
            countdownTimeout = setTimeout(() => setTime((previousState) => previousState - 1), 1000);
        } else if (isCounting && time === 0) {
            setIfItHasFinished(true);
            setIfItIsCounting(false);
        }
    }, [isCounting, time]);

    const renderButton = () => {
        if (!hasFinished) {
            if (isCounting) {
                return (
                    <button
                        type="button"
                        onClick={resetCountdown}
                        className={`${styles.startCountdownButton} ${styles.stopButton}`}
                    >
                        Abandonar ciclo
                    </button>
                );
            } else {
                return (
                    <button
                        type="button"
                        onClick={startCountdown}
                        className={styles.startCountdownButton}
                    >
                        Iniciar um ciclo
                    </button>
                );
            }
        } else {
            return (
                <button disabled className={styles.startCountdownButton}>
                    Ciclo encerrado
                </button>
            );
        }
    }

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{separatedMinutes[0]}</span>
                    <span>{separatedMinutes[1]}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{separatedSeconds[0]}</span>
                    <span>{separatedSeconds[1]}</span>
                </div>
            </div>

            {renderButton()}
        </div>
    );
}

export default Countdown;