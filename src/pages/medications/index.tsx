import React, { useState } from 'react';
import styles from './medications.module.css';
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
            <h1 className={styles.title}>All Medications</h1>

            {/* Use SearchAndFilter Component */}
            <SearchAndFilter
                selectedSearch={selectedSearch}
                setSelectedSearch={setSelectedSearch}
                selectedLetter={selectedLetter} // Add this line
                setSelectedLetter={setSelectedLetter}
            />

            {/* Medications List */}
            {Array.isArray(allMedication) && allMedication.length > 0 ? (
                <ul className={styles.medicationList}>
                    {allMedication.map((medication: Medication) => (
                        <li key={medication.id} className={styles.medicationItem}>
                            <h2>{medication.name}</h2>
                            <p><strong>Price:</strong> {medication.price}</p>
                            <p><strong>Stock:</strong> {medication.stock}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No medications found.</p>
            )}
        </div>
    );
};

export default MedicationsPage;
