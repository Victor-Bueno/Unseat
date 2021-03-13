import { useContext } from 'react';

import styles from '../styles/components/Profile.module.css';

import ChallengesContext from '../contexts/ChallengesContext';

const Profile = () => {
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/Victor-Bueno.png" alt="Profile image" />
            <div>
                <strong>Victor Bueno</strong>
                <p>
                    <img src="icons/level.svg" alt="Level up symbol" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}

export default Profile;