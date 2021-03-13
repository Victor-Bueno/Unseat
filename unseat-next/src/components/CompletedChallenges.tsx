import { useContext } from 'react';

import styles from '../styles/components/CompletedChallenges.module.css';

import ChallengesContext from '../contexts/ChallengesContext';

const CompletedChallenges = () => {
    const { completedChallenges } = useContext(ChallengesContext);

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{completedChallenges}</span>
        </div>
    );
}

export default CompletedChallenges;