import { useContext } from 'react';

import styles from '../styles/components/Countdown.module.css';

import { CountdownContext } from '../contexts/CountdownContext';


const Countdown = () => {
    const {
        minutes,
        seconds,
        hasFinished,
        isCounting,
        resetCountdown,
        startCountdown
    } = useContext(CountdownContext);

    const separatedMinutes = String(minutes).padStart(2, "0").split("");
    const separatedSeconds = String(seconds).padStart(2, "0").split("");

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