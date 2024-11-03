import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from './MultiStepForm.module.css';
import { getAllMedicationNoFilter } from '../api/medicationApi';
import useAuthFetch from '../hooks/useAuthFetch';
import { useUser } from '../context/UserContext';
import { Medication } from '../types/Medication';
import { createRequest } from '../api/requestApi';

const MultiStepForm = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selectedMedication, setSelectedMedication] = useState<Medication>();
    const [formData, setFormData] = useState<{
        dosagecount: number;
        freq: number;
        medication: Medication | undefined; // allow for undefined initially
        personalInfo: {
            patientName: string;
            patientAddress: string;
            patientDOB: string;
        };
        doctorInsuranceInfo: {
            clinicianName: string;
            clinicianAddress: string;
            insuranceInfo: string;
        };
    }>({
        dosagecount: 0,
        freq: 0,
        medication: undefined,
        personalInfo: { patientName: '', patientAddress: '', patientDOB: '' },
        doctorInsuranceInfo: { clinicianName: '', clinicianAddress: '', insuranceInfo: '' },
    });

    const { user } = useUser();
    const { data: allMedication } = useAuthFetch(getAllMedicationNoFilter, user);
    const { register, handleSubmit } = useForm();

    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const previousStep = () => {
        setStep((prev) => prev - 1);
    };

    const onSubmit = async (data: any) => {
        if (step === 0) {
            // Step 0: Save personal info
            setFormData((prev) => ({
                ...prev,
                personalInfo: {
                    patientName: data.patientName,
                    patientAddress: data.patientAddress,
                    patientDOB: data.patientDOB,
                },
            }));
            nextStep();
        } else if (step === 1) {
            // Step 1: Save medication info
            const medicationSelected = allMedication.find(
                (medication: Medication) => medication.name === data.medicationName
            );
            if (medicationSelected) {
                setFormData((prev) => ({
                    ...prev,
                    dosagecount: Number(data.dosage),
                    freq: Number(data.frequency),
                    medication: medicationSelected,
                }));
            }
            nextStep();
        } else if (step === 2) {
            // Step 2: Save doctor and insurance info
            setFormData((prev) => ({
                ...prev,
                doctorInsuranceInfo: {
                    clinicianName: data.clinicianName,
                    clinicianAddress: data.clinicianAddress,
                    insuranceInfo: data.insuranceInfo,
                },
            }));
            nextStep();
        } else {
            // Final Step: Create the request
            try {
                if (selectedMedication) { // Ensure medication is defined
                    const requestData = {
                        dosageCount: formData.dosagecount,
                        dosageFreq: formData.freq,
                        med: selectedMedication, // Pass the entire medication object
                    };
                    console.log(requestData)
                    // Check if user is not null
                    if (user) {
                        // Call createRequest with user and the structured request data
                        await createRequest(user, requestData);
                        toast.success('Request submitted successfully!'); // Toast on success

                        // Reset the form data
                        setFormData({
                            dosagecount: 0,
                            freq: 0,
                            medication: undefined,
                            personalInfo: { patientName: '', patientAddress: '', patientDOB: '' },
                            doctorInsuranceInfo: { clinicianName: '', clinicianAddress: '', insuranceInfo: '' },
                        });
                        router.push('/home');
                    } else {
                        console.error('User is not authenticated.');
                        // Handle the case where user is null (e.g., redirect to login)
                    }
                } else {
                    console.error('Medication is not selected.');
                    // Handle the case where no medication is selected
                }
            } catch (error) {
                console.error('Error creating request:', error);
                // Handle error (e.g., display a message to the user)
            }
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 0: Personal Information */}
                {step === 0 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Personal Information</h2>
                        <input className={styles.inputField} {...register('patientName')} placeholder="Patient's Name" required />
                        <input className={styles.inputField} {...register('patientAddress')} placeholder="Patient's Address" required />
                        <input className={styles.inputField} {...register('patientDOB')} placeholder="Patient's Date of Birth" type="date" required />
                    </div>
                )}

                {/* Step 1: Medication Information */}
                {step === 1 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Medication Information</h2>
                        <select className={styles.inputField}
                            {...register('medicationName')}
                            required
                            onChange={(e) => {
                                const selected = allMedication.find(
                                    (medication: Medication) => medication.name === e.target.value
                                );
                                setSelectedMedication(selected); // Save the full medication object
                            }}
                        >
                            <option value="">Select Medication</option>
                            {allMedication?.map((medication: Medication) => (
                                <option key={medication.id} value={medication.name}>
                                    {medication.name}
                                </option>
                            ))}
                        </select>
                        <input className={styles.inputField} {...register('dosage')} placeholder="Dosage" required />
                        <input className={styles.inputField} {...register('frequency')} placeholder="Frequency" required />
                    </div>
                )}

                {/* Step 2: Doctor and Insurance Information */}
                {step === 2 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Doctor and Insurance Information</h2>
                        <input className={styles.inputField} {...register('clinicianName')} placeholder="Clinician Name" disabled />
                        <input className={styles.inputField} {...register('clinicianAddress')} placeholder="Clinician Address" disabled />
                        <input className={styles.inputField} {...register('insuranceInfo')} placeholder="Insurance" disabled />
                    </div>
                )}

                {/* Final Step: Summary */}
                {step === 3 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Summary</h2>
                        <div className={styles.summarySection}>
                            <h3>Personal Information</h3>
                            <p>Name: {formData.personalInfo.patientName}</p>
                            <p>Address: {formData.personalInfo.patientAddress}</p>
                            <p>Date of Birth: {formData.personalInfo.patientDOB}</p>
                        </div>
                        <div className={styles.summarySection}>
                            <h3>Medication Information</h3>
                            <p>Dosage Count: {formData.dosagecount}</p>
                            <p>Frequency: {formData.freq}</p>
                            <p>Medication: {formData.medication?.name}</p>
                        </div>
                        <div className={styles.summarySection}>
                            <h3>Doctor and Insurance Information</h3>
                            <p>Clinician: {formData.doctorInsuranceInfo.clinicianName}</p>
                            <p>Insurance Info: {formData.doctorInsuranceInfo.insuranceInfo}</p>
                        </div>
                        <div className={styles.summaryItem}>
                            {selectedMedication ? (
                                <div>
                                    <p><strong>Medication Cost/dose: </strong> ${selectedMedication.price}</p>
                                    <p><strong>Total Cost:</strong> ${selectedMedication.price * formData.dosagecount}</p>
                                </div>
                            ) : (
                                <p>No medication selected.</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    {step > 0 && <button type="button" onClick={previousStep} className={`${styles.button} ${styles.backButton}`}>Back</button>}
                    <button type="submit" className={`${styles.button} ${step === 3 ? styles.finalButton : styles.nextButton}`}>{step === 3 ? 'Send' : 'Next'}</button>
                </div>
            </form>
        </div>
    );
};

export default MultiStepForm;
