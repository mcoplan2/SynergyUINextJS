

import MedicationMultiStepForm from '@/src/components/MedicationMultiStepForm';
import styles from './index.module.css';

const RefillPrescriptionPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
            <div className="max-w-md mx-auto">
            <h1 className={styles.title}>Add a Medication</h1>
            <MedicationMultiStepForm/>
        </div>
        </main>
        </div>
    );
};

export default RefillPrescriptionPage;