// src/components/Footer.tsx

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css'; // Optional: Import a CSS module for styling

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li>
                            <Link href="/about">About Us</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link href="/privacy">Privacy Policy</Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} My Pharmacy. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
