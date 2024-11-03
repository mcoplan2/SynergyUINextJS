import React, { useState } from 'react';
import styles from './../medications.module.css';
import { useUser } from '@/src/context/UserContext';
import useAuthFetch from '@/src/hooks/useAuthFetch';
import { getApprovedRequests } from '@/src/api/requestApi';
import { RefillRequest } from '@/src/types/Request';


const UserMedicationsPage: React.FC = () => {
    const { user } = useUser();

    const { data: allMedication} = useAuthFetch(getApprovedRequests, user);


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>All Medications</h1>

            {/* Medications List */}
            {Array.isArray(allMedication) && allMedication.length > 0 ? (
                <ul className={styles.medicationList}>
                    {allMedication.map((medication: RefillRequest) => (
                        <li key={medication.reqId.id} className={styles.medicationItem}>
                            <h2>{medication.reqId.med.name}</h2>
                            <p><strong>Dosage:</strong> {medication.reqId.dosageCount}</p>
                            <p><strong>Freq:</strong> {medication.reqId.dosageFreq}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No medications found.</p>
            )}
        </div>
    );
};

export default UserMedicationsPage;
