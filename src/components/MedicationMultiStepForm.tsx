import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from './MultiStepForm.module.css';
import { addMedication, getAllMedicationNoFilter } from '../api/medicationApi';
import useAuthFetch from '../hooks/useAuthFetch';
import { useUser } from '../context/UserContext';
import { Medication, MedicationStatus, MedicationType } from '../types/Medication';
import { createRequest } from '../api/requestApi';

const MedicationMultiStepForm = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selectedMedication, setSelectedMedication] = useState<Medication>();
    const [formData, setFormData] = useState<{
        basicInfo: {
            medicationName: string;
            formulation: string;
            strength: string;
            manufacturer: string;
            ndcNumber: string;
        };
        regulatoryInfo: {
            drugClassification: string;
            scheduledClass: string;
            warnings: string;
            storageRequirements: string;
            expirationDate: string;
        };
        pricingInfo: {
            cost: number;
            insuranceCoverage: string;
        };
        inventoryInfo: {
            quantityInStock: number;
            reorderLevel: number;
            supplierInfo: string;
        };
        additionalInfo: {
            indications: string;
            dosageInstructions: string;
            patientCounselingInfo: string;
        };
        documentation: {
            lotNumber: string;
            additionalDocs: string;
        };
    }>({
        basicInfo: {
            medicationName: '',
            formulation: '',
            strength: '',
            manufacturer: '',
            ndcNumber: '',
        },
        regulatoryInfo: {
            drugClassification: '',
            scheduledClass: '',
            warnings: '',
            storageRequirements: '',
            expirationDate: '',
        },
        pricingInfo: {
            cost: 0,
            insuranceCoverage: '',
        },
        inventoryInfo: {
            quantityInStock: 0,
            reorderLevel: 0,
            supplierInfo: '',
        },
        additionalInfo: {
            indications: '',
            dosageInstructions: '',
            patientCounselingInfo: '',
        },
        documentation: {
            lotNumber: '',
            additionalDocs: '',
        },
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
            // Step 0: Basic Information
            setFormData((prev) => ({
                ...prev,
                basicInfo: {
                    medicationName: data.medicationName,
                    formulation: data.formulation,
                    strength: data.strength,
                    manufacturer: data.manufacturer,
                    ndcNumber: data.ndcNumber,
                },
            }));
            nextStep();
        } else if (step === 1) {
            // Step 1: Regulatory Information
            setFormData((prev) => ({
                ...prev,
                regulatoryInfo: {
                    drugClassification: data.drugClassification,
                    scheduledClass: data.scheduledClass,
                    warnings: data.warnings,
                    storageRequirements: data.storageRequirements,
                    expirationDate: data.expirationDate,
                },
            }));
            nextStep();
        } else if (step === 2) {
            // Step 2: Pricing Information
            setFormData((prev) => ({
                ...prev,
                pricingInfo: {
                    cost: Number(data.cost),
                    insuranceCoverage: data.insuranceCoverage,
                },
            }));
            nextStep();
        } else if (step === 3) {
            // Step 3: Inventory Information
            setFormData((prev) => ({
                ...prev,
                inventoryInfo: {
                    quantityInStock: Number(data.quantityInStock),
                    reorderLevel: Number(data.reorderLevel),
                    supplierInfo: data.supplierInfo,
                },
            }));
            nextStep();
        } else if (step === 4) {
            // Step 4: Additional Information and Documentation
            setFormData((prev) => ({
                ...prev,
                additionalInfo: {
                    indications: data.indications,
                    dosageInstructions: data.dosageInstructions,
                    patientCounselingInfo: data.patientCounseling,
                },
                documentation: {
                    lotNumber: data.lotNumber,
                    additionalDocs: data.additionalDocs,
                },
            }));
            nextStep();
        } else {
            // Final Step: Summary
            try {
                const medicationData = {
                    name: formData.basicInfo.medicationName,
                    stock: formData.inventoryInfo.quantityInStock,
                    price: formData.pricingInfo.cost,
                    type: MedicationType.PILL,
                    status: MedicationStatus.IN_STOCK
                };
                
                // Check if user is not null
                if (user) {
                    await addMedication(user, medicationData)
                    toast.success('Medication added submitted successfully!'); // Toast on success

                    // Reset the form data
                    setFormData({
                        basicInfo: {
                            medicationName: '',
                            formulation: '',
                            strength: '',
                            manufacturer: '',
                            ndcNumber: '',
                        },
                        regulatoryInfo: {
                            drugClassification: '',
                            scheduledClass: '',
                            warnings: '',
                            storageRequirements: '',
                            expirationDate: '',
                        },
                        pricingInfo: {
                            cost: 0,
                            insuranceCoverage: '',
                        },
                        inventoryInfo: {
                            quantityInStock: 0,
                            reorderLevel: 0,
                            supplierInfo: '',
                        },
                        additionalInfo: {
                            indications: '',
                            dosageInstructions: '',
                            patientCounselingInfo: '',
                        },
                        documentation: {
                            lotNumber: '',
                            additionalDocs: '',
                        },
                    });
                    router.push('/home');
                } else {
                    console.error('User is not authenticated.');
                    // Handle the case where user is null (e.g., redirect to login)
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
                {/* Step 0: Basic Information */}
                {step === 0 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Basic Information</h2>
                        <input className={styles.inputField} {...register('medicationName')} placeholder="Medication Name" required />
                        <input className={styles.inputField} {...register('formulation')} placeholder="Formulation" required />
                        <input className={styles.inputField} {...register('strength')} placeholder="Strength" required />
                        <input className={styles.inputField} {...register('manufacturer')} placeholder="Manufacturer" required />
                        <input className={styles.inputField} {...register('ndcNumber')} placeholder="NDC Number" required />
                    </div>
                )}

                {/* Step 1: Regulatory Information */}
                {step === 1 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Regulatory Information</h2>
                        <input className={styles.inputField} {...register('drugClassification')} placeholder="Drug Classification" required />
                        <input className={styles.inputField} {...register('scheduledClass')} placeholder="Scheduled Class" required />
                        <textarea className={styles.inputField} {...register('warnings')} placeholder="Warnings" required />
                        <textarea className={styles.inputField} {...register('storageRequirements')} placeholder="Storage Requirements" required />
                        <input className={styles.inputField} {...register('expirationDate')} placeholder="Expiration Date" type="date" required />
                    </div>
                )}

                {/* Step 2: Pricing Information */}
                {step === 2 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Pricing Information</h2>
                        <input className={styles.inputField} {...register('cost')} placeholder="Cost" type="number" required />
                        <input className={styles.inputField} {...register('insuranceCoverage')} placeholder="Insurance Coverage" required />
                    </div>
                )}

                {/* Step 3: Inventory Information */}
                {step === 3 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Inventory Information</h2>
                        <input className={styles.inputField} {...register('quantityInStock')} placeholder="Quantity in Stock" type="number" required />
                        <input className={styles.inputField} {...register('reorderLevel')} placeholder="Reorder Level" type="number" required />
                        <input className={styles.inputField} {...register('supplierInfo')} placeholder="Supplier Information" required />
                    </div>
                )}

                {/* Step 4: Additional Information and Documentation */}
                {step === 4 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Additional Information and Documentation</h2>
                        <textarea className={styles.inputField} {...register('indications')} placeholder="Indications" required />
                        <textarea className={styles.inputField} {...register('dosageInstructions')} placeholder="Dosage Instructions" required />
                        <textarea className={styles.inputField} {...register('patientCounseling')} placeholder="Patient Counseling Information" required />
                        <input className={styles.inputField} {...register('lotNumber')} placeholder="Lot Number" required />
                        <input className={styles.inputField} {...register('additionalDocs')} placeholder="Additional Documentation" />
                    </div>
                )}

                {/* Final Step: Summary */}
                {step === 5 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Summary</h2>
                        <div className={styles.summarySection}>
                            <h3>Basic Information</h3>
                            <p>Medication Name: {formData.basicInfo.medicationName}</p>
                            <p>Formulation: {formData.basicInfo.formulation}</p>
                            <p>Strength: {formData.basicInfo.strength}</p>
                            <p>Manufacturer: {formData.basicInfo.manufacturer}</p>
                            <p>NDC Number: {formData.basicInfo.ndcNumber}</p>
                        </div>
                        <div className={styles.summarySection}>
                            <h3>Regulatory Information</h3>
                            <p>Drug Classification: {formData.regulatoryInfo.drugClassification}</p>
                            <p>Scheduled Class: {formData.regulatoryInfo.scheduledClass}</p>
                            <p>Warnings: {formData.regulatoryInfo.warnings}</p>
                            <p>Storage Requirements: {formData.regulatoryInfo.storageRequirements}</p>
                            <p>Expiration Date: {formData.regulatoryInfo.expirationDate}</p>
                        </div>
                        <div className={styles.summarySection}>
                            <h3>Pricing Information</h3>
                            <p>Cost: ${formData.pricingInfo.cost}</p>
                            <p>Insurance Coverage: {formData.pricingInfo.insuranceCoverage}</p>
                        </div>
                        <div className={styles.summarySection}>
                            <h3>Inventory Information</h3>
                            <p>Quantity in Stock: {formData.inventoryInfo.quantityInStock}</p>
                            <p>Reorder Level: {formData.inventoryInfo.reorderLevel}</p>
                            <p>Supplier Info: {formData.inventoryInfo.supplierInfo}</p>
                        </div>
                        <div className={styles.summarySection}>
                            <h3>Additional Information</h3>
                            <p>Indications: {formData.additionalInfo.indications}</p>
                            <p>Dosage Instructions: {formData.additionalInfo.dosageInstructions}</p>
                            <p>Patient Counseling Info: {formData.additionalInfo.patientCounselingInfo}</p>
                        </div>
                        <div className={styles.summarySection}>
                            <h3>Documentation</h3>
                            <p>Lot Number: {formData.documentation.lotNumber}</p>
                            <p>Additional Documentation: {formData.documentation.additionalDocs}</p>
                        </div>
                    </div>
                )}

<div className="flex justify-between mt-4">
                    {step > 0 && <button type="button" onClick={previousStep} className={`${styles.button} ${styles.backButton}`}>Back</button>}
                    <button type="submit" className={`${styles.button} ${step === 5 ? styles.finalButton : styles.nextButton}`}>{step === 5 ? 'Send' : 'Next'}</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default MedicationMultiStepForm;
