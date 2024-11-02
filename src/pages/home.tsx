import Link from 'next/link';
import styles from './home.module.css';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { getApprovedRequests, getNumberOfRequests } from '../api/requestApi';
import Modal from '../components/Modal';

const HomePage = () => {
    const { user } = useUser();
    const [numberRequests, setNumberRequests] = useState<number>(0);
    const [approvedRequests, setApprovedRequests] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRefill, setSelectedRefill] = useState<any>(null);

    useEffect(() => {
        const fetchApprovedRequests = async () => {
            if (user) {
                try {
                    const requests = await getApprovedRequests(user);
                    setApprovedRequests(requests);
                } catch (error) {
                    console.error('Failed to fetch approved requests:', error);
                }
            }
        };

        fetchApprovedRequests();
    }, [user]);

    useEffect(() => {
        const fetchNumberOfRequests = async () => {
            if (user) {
                try {
                    const count = await getNumberOfRequests(user);
                    setNumberRequests(count);
                } catch (error) {
                    console.error('Failed to fetch number of requests:', error);
                }
            }
        };

        fetchNumberOfRequests();
    }, [user]);

    console.log(approvedRequests);

    if (!user) return <p>Loading...</p>;

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
            <h1 className={styles.title}>Welcome, {user.firstName}!</h1>

            {/* Open Refills Section */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Current Medication</h2>
                {approvedRequests.length > 0 ? (
                    <div className={styles.cardGrid}>
                        {approvedRequests.map((refill) => (
                            <div key={refill.reqId.id} className={styles.card}>
                                <h3 className={styles.cardTitle}>{refill.medicationId.name}</h3>
                                <p className={styles.cardText}>Refill Date: {refill.updateDate}</p>
                                <p className={styles.cardText}>Quantity: {refill.reqId.dosageCount}</p>
                                <button className={styles.linkButton} onClick={() => openModal(refill)}>
                                    View Refill Details
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.cardText}>No open refills at the moment.</p>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} refillDetails={{
                name: selectedRefill?.medicationId?.name,
                updateDate: selectedRefill?.updateDate,
                dosageCount: selectedRefill?.reqId?.dosageCount
            }} />
        </div>
    );
};

export default HomePage;
