// pages/refill-prescription.tsx

import MultiStepForm from "@/src/components/MultiStepForm";
import styles from './index.module.css';

const RefillPrescriptionPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
        <div className="max-w-md mx-auto">
            <h1 className={styles.title}>Refill Prescription</h1>
            <MultiStepForm/>
        </div>
        </main>
        </div>
    );
};

export default RefillPrescriptionPage;
