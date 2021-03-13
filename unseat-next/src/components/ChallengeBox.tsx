import { useContext } from 'react';

import styles from '../styles/components/ChallengeBox.module.css';

import ChallengesContext from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

const ChallengeBox = () => {
    const {
        activeChallenge,
        resetChallenge,
        completeChallenge
    } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    const handleChallengeSucceeded = () => {
        completeChallenge();
        resetCountdown();
    }

    const handleChallengeFailed = () => {
        resetChallenge();
        resetCountdown();
    }

    const renderBody = () => {
        if (activeChallenge) {
            return (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Challenge icon" />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            type="button"
                            onClick={handleChallengeFailed}
                            className={styles.challengeFailedBtn}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            onClick={handleChallengeSucceeded}
                            className={styles.challengeSucceededBtn}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            );
        } else {
            return (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up icon" />
                        Avance de level completando desafios.
                    </p>
                </div>
            );
        }
    }
    return (
        <div className={styles.challengeBoxContainer}>
            {renderBody()}
        </div>
    );
}

export default ChallengeBox;