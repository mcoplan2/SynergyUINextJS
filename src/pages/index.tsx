// pages/index.tsx
import React from 'react';
import styles from './index.module.css';

const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.card}>
                    <p className={styles.cardText}>Here you can manage your refills, payments, and more.</p>
                    <button className={styles.button}>
                        Get Started
                    </button>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
