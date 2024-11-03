// pages/refill-prescription.tsx
import { useUser } from "@/src/context/UserContext";
import useAuthFetch from "@/src/hooks/useAuthFetch";
import { getNumberOfRequests } from "@/src/api/requestApi";
import { ReqId } from '@/src/types/Request';
import styles from './../../../home.module.css';

const OpenPrescriptionPage = () => {
    const { user } = useUser();
    const { data: allOpenRequests } = useAuthFetch(getNumberOfRequests, user);

    return (
        <div className={styles.container}> 
        <main className={styles.main}>
            <h1 className={styles.welcomeTitle}>Pending Refills</h1> 
    
            {Array.isArray(allOpenRequests) && allOpenRequests.length > 0 ? (
                <div className={styles.cardGrid}>
                    {allOpenRequests.map((request: ReqId) => (
                        <div key={request.id} className={styles.card}> 
                        <h3 className={styles.cardTitle}>{request.med.name}</h3>
                        <p className={styles.cardText}>Dosage: {request.dosageCount}</p>
                        <p className={styles.cardText}>Freq: {request.dosageFreq}</p>
                        <p className={styles.cardText}>Status: {request.requestType}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No Requests found.</p>
            )}
            </main>
        </div>
    );
};

export default OpenPrescriptionPage;
