

import MedicationMultiStepForm from '@/src/components/MedicationMultiStepForm';
import styles from './index.module.css';

const RefillPrescriptionPage = () => {
    return (
        <div className={styles.container}>
        <div className="max-w-md mx-auto">
            <h1 className="text-xl font-bold">Refill Prescription</h1>
            <MedicationMultiStepForm/>
        </div>
        </div>
    );
};

export default RefillPrescriptionPage;