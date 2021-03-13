import { useContext } from 'react';

import styles from '../styles/components/ExperienceBar.module.css';

import { ChallengesContext } from '../contexts/ChallengesContext';

const ExperienceBar = () => {
    const { currentExp, experienceToNextLevel } = useContext(ChallengesContext);
    const percentToNextLevel = Math.round(currentExp * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBarContainer}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span style={{ left: `${percentToNextLevel}%` }} className={styles.currentExperience}>{currentExp} xp</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}

export default ExperienceBar;