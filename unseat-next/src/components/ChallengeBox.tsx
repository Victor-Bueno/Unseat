import styles from '../styles/components/ChallengeBox.module.css';

const ChallengeBox = () => {
    const hasActiveChallenge = true;

    const renderBody = () => {
        if (hasActiveChallenge) {
            return (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400 xp</header>
                    <main>
                        <img src="icons/body.svg" alt="Challenge icon" />
                        <strong>Novo desafio</strong>
                        <p>Levante e faça uma caminhada de 3 minutos</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.challengeFailedBtn}>Falhei</button>
                        <button type="button" className={styles.challengeSucceededBtn}>Completei</button>
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