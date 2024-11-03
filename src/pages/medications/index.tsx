import React, { useState } from 'react';
import styles from './../home.module.css';
import useAuthFetch from '@/src/hooks/useAuthFetch';
import { useUser } from '@/src/context/UserContext';
import { getAllMedication } from '@/src/api/medicationApi';
import { Medication } from '@/src/types/Medication';
import useFilteredFetch from '@/src/hooks/useFilteredFetch';
import SearchAndFilter from '@/src/components/SearchAndFilter';

const MedicationsPage: React.FC = () => {
    const [selectedLetter, setSelectedLetter] = useState<string>("");
    const [selectedSearch, setSelectedSearch] = useState<string>("");
    const { user } = useUser();

    const { data: allMedication, isLoading, error } = useFilteredFetch(getAllMedication, selectedLetter, selectedSearch);


    return (
        <div className={styles.container}>
            <main className={styles.main}>
            
            <h1 className={styles.welcomeTitle}>All Medications</h1>

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
                    {allMedication.map((medication: Medication) => (
                        <div key={medication.id} className={styles.card}>
                            <h3 className={styles.cardTitle}>{medication.name}</h3>
                            <p className={styles.cardText}>ID: {medication.id}</p>
                            <p className={styles.cardText}>Price: ${medication.price} per unit</p>
                            <p className={styles.cardText}>Stock: {medication.stock}</p>
                            <p className={styles.cardText}>Status: {medication.status}</p>
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

export default MedicationsPage;
