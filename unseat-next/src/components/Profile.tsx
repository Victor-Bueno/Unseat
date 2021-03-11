import styles from '../styles/components/Profile.module.css';

const Profile = () => {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/Victor-Bueno.png" alt="Profile image" />
            <div>
                <strong>Victor Bueno</strong>
                <p>Level 1</p>
            </div>
        </div>
    );
}

export default Profile;