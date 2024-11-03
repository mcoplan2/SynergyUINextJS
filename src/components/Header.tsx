import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';
import { useUser } from '../context/UserContext';
import { Role } from '../types/User';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const [medicationDropdownOpen, setMedicationDropdownOpen] = useState(false);
    const [refillsDropdownOpen, setRefillsDropdownOpen] = useState(false);
    const [paymentsDropdownOpen, setPaymentsDropdownOpen] = useState(false);
    const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

    const { user, setUser} = useUser();
    const router = useRouter();


    const handleLogout = () => {
        // Clear user data (or cache) here
        setUser(null); 
        // Redirect to the home page
        router.push('/');
    };

    const handleMouseEnter = (setDropdown: React.Dispatch<React.SetStateAction<boolean>>) => {
        setDropdown(true);
    };

    const handleMouseLeave = (setDropdown: React.Dispatch<React.SetStateAction<boolean>>) => {
        setDropdown(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    <Link href="/" className={styles.navLink}>
                        My Pharmacy
                    </Link>
                </h1>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {user &&
                        <li className={styles.dropdown}
                            onMouseEnter={() => handleMouseEnter(setMedicationDropdownOpen)}
                            onMouseLeave={() => handleMouseLeave(setMedicationDropdownOpen)}>
                            <span className={styles.navLink}>Medication</span>
                            {medicationDropdownOpen && (
                                <ul className={styles.dropdownMenu}>
                                    <li>
                                        <Link href="/medications" className={styles.dropdownLink}>
                                            All Medication
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/medications/user" className={styles.dropdownLink}>
                                            Your Medication
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        }
                        {user &&
                        <li className={styles.dropdown}
                            onMouseEnter={() => handleMouseEnter(setRefillsDropdownOpen)}
                            onMouseLeave={() => handleMouseLeave(setRefillsDropdownOpen)}>
                            <span className={styles.navLink}>Refills</span>
                            {refillsDropdownOpen && (
                                <ul className={styles.dropdownMenu}>
                                    <li>
                                        <Link href="/refills/user/open" className={styles.dropdownLink}>
                                            Open Refills
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/refills/user/new" className={styles.dropdownLink}>
                                            Create Refill
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        }
                        {user &&
                        <li className={styles.dropdown}
                            onMouseEnter={() => handleMouseEnter(setPaymentsDropdownOpen)}
                            onMouseLeave={() => handleMouseLeave(setPaymentsDropdownOpen)}>
                            <span className={styles.navLink}>Payments</span>
                            {paymentsDropdownOpen && (
                                <ul className={styles.dropdownMenu}>
                                    <li>
                                    <Link href="/payments/user/outstanding" className={styles.dropdownLink}>
                                        Outstanding Payments
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/payments/user/history" className={styles.dropdownLink}>
                                        Payment History
                                    </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        }
                        { (user?.role === Role.ADMIN) &&
                        <li className={styles.dropdown}
                            onMouseEnter={() => handleMouseEnter(setAdminDropdownOpen)}
                            onMouseLeave={() => handleMouseLeave(setAdminDropdownOpen)}>
                            <span className={styles.navLink}>Admin</span>
                            {adminDropdownOpen && (
                                <ul className={styles.dropdownMenu}>
                                    <li>
                                    <Link href="/admin/refills" className={styles.dropdownLink}>
                                        All Refills
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/payments" className={styles.dropdownLink}>
                                        All Payments
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/medications/new" className={styles.dropdownLink}>
                                        Add Medication
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/refills/pending" className={styles.dropdownLink}>
                                        Pending Refills
                                    </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        }
                        {user &&
                        <li>
                            <Link href="/profile/edit" className={styles.navLink}>
                                Profile
                            </Link>
                        </li>
                        }
                        {!user &&
                        <li className={styles.loginItem}>
                            <Link href="/login" className={styles.navLink}>
                                Login
                            </Link>
                        </li>
                        }
                        {user && 
                        <li className={styles.loginItem}>
                            <button onClick={handleLogout} className={styles.navLink}>
                                Logout
                            </button>
                        </li>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
