import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { getApprovedRequests, getNumberOfRequests } from '../api/requestApi';
import Modal from '../components/Modal';
import useAuthFetch from '../hooks/useAuthFetch';
import { RefillRequest } from '../types/Request';
import { getUnpaidPaymentsByUser } from '../api/paymentApi';
import styles from './home.module.css';
import { RefillFormData } from '../types/RefillPrescription';

const HomePage = () => {
    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRefill, setSelectedRefill] = useState<RefillRequest | null>(null);
    const { data: approvedRequests } = useAuthFetch(getApprovedRequests, user);
    const { data: numberRequests } = useAuthFetch(getNumberOfRequests, user);
    const { data: unpaidPayments } = useAuthFetch(getUnpaidPaymentsByUser, user);

    if (!user) return <div className={styles.loadingContainer}>Loading...</div>;

    if (!approvedRequests) {
        return <div className={styles.loadingContainer}>Loading...</div>;
    }

    console.log(approvedRequests)

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
            <main className={styles.main}>
                <section className={styles.welcomeSection}>
                    <h2 className={styles.welcomeTitle}>Welcome, {user.firstName}!</h2>
                    <div className={styles.summaryCards}>
                        <div className={styles.summaryCard}>
                            <h3 className={styles.summaryTitle}>Open Requests</h3>
                            <p className={styles.summaryContent}>
                                <Link href="/requests" className={styles.link}>
                                    {numberRequests !== null ? numberRequests.length : 'Loading...'}
                                </Link>
                            </p>
                        </div>
                        <div className={styles.summaryCard}>
                            <h3 className={styles.summaryTitle}>Unpaid Payments</h3>
                            <p className={styles.summaryContent}>
                                <Link href="/payments" className={styles.link}>
                                    {unpaidPayments !== null ? unpaidPayments.length : 'Loading...'}
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.refillsSection}>
                    <h2 className={styles.sectionTitle}>Approved Refills</h2>
                    {approvedRequests.length > 0 ? (
                        <div className={styles.cardGrid}>
                            {approvedRequests.map((refill: RefillRequest) => (
                                <div key={refill.reqId.id} className={styles.card}>
                                    <h3 className={styles.cardTitle}>{refill.medicationId.name}</h3>
                                    <p className={styles.cardText}>Refill Date: {refill.updateDate}</p>
                                    <p className={styles.cardText}>Quantity: {refill.reqId.dosageCount}</p>
                                    <p className={styles.cardText}>Frequency: {refill.reqId.dosageFreq} daily</p>
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
                        <p className={styles.noRefillsMessage}>No open refills at the moment.</p>
                    )}
                </section>
            </main>

            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                refillDetails={{
                    id: (selectedRefill as RefillRequest)?.reqId?.id,
                    name: (selectedRefill as RefillRequest)?.medicationId?.name,
                    updateDate: (selectedRefill as RefillRequest)?.updateDate,
                    creationDate: (selectedRefill as RefillRequest)?.creationDate,
                    dosageCount: (selectedRefill as RefillRequest)?.reqId?.dosageCount,
                    dosageFreq: (selectedRefill as RefillRequest)?.reqId?.dosageFreq
                }} 
            />
        </div>
    );
};

export default HomePage;