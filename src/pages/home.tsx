import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { getApprovedRequests, getNumberOfRequests } from '../api/requestApi';
import Modal from '../components/Modal';
import useAuthFetch from '../hooks/useAuthFetch';
import { RefillRequest } from '../types/Request';
import { getUnpaidPaymentsByUser } from '../api/paymentApi';
import styles from './home.module.css';

const HomePage = () => {
    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRefill, setSelectedRefill] = useState<any>(null);
    const { data: approvedRequests } = useAuthFetch(getApprovedRequests, user);
    const { data: numberRequests } = useAuthFetch(getNumberOfRequests, user);
    const { data: unpaidPayments } = useAuthFetch(getUnpaidPaymentsByUser, user);

    if (!user) return <p className="text-center mt-10">Loading...</p>;

    if (!approvedRequests) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    const openModal = (refill: any) => {
        setSelectedRefill(refill);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRefill(null);
    };

    return (
        <div className={styles.container}>

            {/* Open Refills Section */}
            <div className={styles.section}>
            <div className={styles.section}>
                </div>
            <div className={styles.cardLarge}>
                <h1 className={styles.title}>Welcome, {user.firstName}!</h1>
            <div className={styles.wideCardGrid}>
            <div className={styles.wideCard}>
                <p className={styles.cardText}>
                        You have <Link href="/requests" className={styles.link}>{numberRequests !== null ? numberRequests.length : 'Loading...'}</Link> Open Requests
                </p>
            </div>
            <div className={styles.wideCard}>
                 <p className={styles.cardText}>
                    You have <Link href="/payments" className={styles.link}>{unpaidPayments !== null ? unpaidPayments.length : 'Loading...'}</Link> Unpaid Payments
                    </p>
            </div>
            </div>
            </div>
            <div className={styles.cardGrid}>
            </div>

                {approvedRequests.length > 0 ? (
                    <div className={styles.cardGrid}>
                        {approvedRequests.map((refill: RefillRequest) => (
                            <div key={refill.reqId.id} className={styles.card}>
                                <h3 className={styles.cardTitle}>{refill.medicationId.name}</h3>
                                <p className={styles.cardText}>Refill Date: {refill.updateDate}</p>
                                <p className={styles.cardText}>Quantity: {refill.reqId.dosageCount}</p>
                                <button
                                    className={styles.linkButton}
                                    onClick={() => openModal(refill)}
                                >
                                    View Refill Details
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-4 cardText">No open refills at the moment.</p>
                )}
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                refillDetails={{
                    name: selectedRefill?.medicationId?.name,
                    updateDate: selectedRefill?.updateDate,
                    dosageCount: selectedRefill?.reqId?.dosageCount
                }} 
            />
        </div>
    );
};

export default HomePage;
