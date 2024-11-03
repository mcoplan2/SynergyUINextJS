import React, { useState } from 'react';
import styles from './../../home.module.css';
import { useUser } from '@/src/context/UserContext';
import useAuthFetch from '@/src/hooks/useAuthFetch';
import { getApprovedRequests } from '@/src/api/requestApi';
import { RefillRequest } from '@/src/types/Request';
import SearchAndFilter from '@/src/components/SearchAndFilter';
import useFilteredFetch from '@/src/hooks/useFilteredFetch';


const UserMedicationsPage: React.FC = () => {
    const { user } = useUser();
    const [selectedLetter, setSelectedLetter] = useState<string>("");
    const [selectedSearch, setSelectedSearch] = useState<string>("");

    const { data: allMedication} = useFilteredFetch(getApprovedRequests, selectedLetter, selectedSearch);


    return (
        <div className={styles.container}>
            <main className={styles.main}>
            <h1 className={styles.welcomeTitle}>Your Current Medications</h1>

            {/* Use SearchAndFilter Component */}
            <SearchAndFilter
                selectedSearch={selectedSearch}
                setSelectedSearch={setSelectedSearch}
                selectedLetter={selectedLetter} // Add this line
                setSelectedLetter={setSelectedLetter}
            />
            {/* Medications List */}
            {Array.isArray(allMedication) && allMedication.length > 0 ? (
                <ul className={styles.cardGrid}>
                    {allMedication.map((medication: RefillRequest) => (
                        <div key={medication.reqId.id} className={styles.card}>
                            <h3 className={styles.cardTitle}>{medication.reqId.med.name}</h3>
                            <p className={styles.cardText}>Dosage: {medication.reqId.dosageCount}</p>
                            <p className={styles.cardText}>Freq: {medication.reqId.dosageFreq}</p>
                            <p className={styles.cardText}>Status: {medication.reqId.requestType}</p>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No medications found.</p>
            )}
            </main>
        </div>
    );
};

export default UserMedicationsPage;
