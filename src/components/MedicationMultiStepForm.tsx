import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from './MultiStepForm.module.css';
import { addMedication } from '../api/medicationApi';
import { useUser } from '../context/UserContext';
import { MedicationInfo, MedicationStatus, MedicationType } from '../types/Medication';

const MedicationMultiStepForm = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<MedicationInfo>({
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
    const { register, handleSubmit } = useForm<MedicationInfo>();

    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const previousStep = () => {
        setStep((prev) => prev - 1);
    };

    const onSubmit = async (data: MedicationInfo) => {
        if (step === 0) {
            // Step 0: Basic Information
            setFormData((prev) => ({
                ...prev,
                basicInfo: {
                    medicationName: data.basicInfo.medicationName,
                    formulation: data.basicInfo.formulation,
                    strength: data.basicInfo.strength,
                    manufacturer: data.basicInfo.manufacturer,
                    ndcNumber: data.basicInfo.ndcNumber,
                },
            }));
            nextStep();
        } else if (step === 1) {
            // Step 1: Regulatory Information
            setFormData((prev) => ({
                ...prev,
                regulatoryInfo: {
                    drugClassification: data.regulatoryInfo.drugClassification,
                    scheduledClass: data.regulatoryInfo.scheduledClass,
                    warnings: data.regulatoryInfo.warnings,
                    storageRequirements: data.regulatoryInfo.storageRequirements,
                    expirationDate: data.regulatoryInfo.expirationDate,
                },
            }));
            nextStep();
        } else if (step === 2) {
            // Step 2: Pricing Information
            setFormData((prev) => ({
                ...prev,
                pricingInfo: {
                    cost: Number(data.pricingInfo.cost),
                    insuranceCoverage: data.pricingInfo.insuranceCoverage,
                },
            }));
            nextStep();
        } else if (step === 3) {
            // Step 3: Inventory Information
            setFormData((prev) => ({
                ...prev,
                inventoryInfo: {
                    quantityInStock: Number(data.inventoryInfo.quantityInStock),
                    reorderLevel: Number(data.inventoryInfo.reorderLevel),
                    supplierInfo: data.inventoryInfo.supplierInfo,
                },
            }));
            nextStep();
        } else if (step === 4) {
            // Step 4: Additional Information and Documentation
            setFormData((prev) => ({
                ...prev,
                additionalInfo: {
                    indications: data.additionalInfo.indications,
                    dosageInstructions: data.additionalInfo.dosageInstructions,
                    patientCounselingInfo: data.additionalInfo.patientCounselingInfo,
                },
                documentation: {
                    lotNumber: data.documentation.lotNumber,
                    additionalDocs: data.documentation.additionalDocs,
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
                        <input className={styles.inputField} {...register('basicInfo.medicationName')} placeholder="Medication Name" required />
                        <input className={styles.inputField} {...register('basicInfo.formulation')} placeholder="Formulation" required />
                        <input className={styles.inputField} {...register('basicInfo.strength')} placeholder="Strength" required />
                        <input className={styles.inputField} {...register('basicInfo.manufacturer')} placeholder="Manufacturer" required />
                        <input className={styles.inputField} {...register('basicInfo.ndcNumber')} placeholder="NDC Number" required />
                    </div>
                )}

                {/* Step 1: Regulatory Information */}
                {step === 1 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Regulatory Information</h2>
                        <input className={styles.inputField} {...register('regulatoryInfo.drugClassification')} placeholder="Drug Classification" required />
                        <input className={styles.inputField} {...register('regulatoryInfo.scheduledClass')} placeholder="Scheduled Class" required />
                        <textarea className={styles.inputField} {...register('regulatoryInfo.warnings')} placeholder="Warnings" required />
                        <textarea className={styles.inputField} {...register('regulatoryInfo.storageRequirements')} placeholder="Storage Requirements" required />
                        <input className={styles.inputField} {...register('regulatoryInfo.expirationDate')} placeholder="Expiration Date" type="date" required />
                    </div>
                )}

                {/* Step 2: Pricing Information */}
                {step === 2 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Pricing Information</h2>
                        <input className={styles.inputField} {...register('pricingInfo.cost')} placeholder="Cost" type="number" required />
                        <input className={styles.inputField} {...register('pricingInfo.insuranceCoverage')} placeholder="Insurance Coverage" required />
                    </div>
                )}

                {/* Step 3: Inventory Information */}
                {step === 3 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Inventory Information</h2>
                        <input className={styles.inputField} {...register('inventoryInfo.quantityInStock')} placeholder="Quantity in Stock" type="number" required />
                        <input className={styles.inputField} {...register('inventoryInfo.reorderLevel')} placeholder="Reorder Level" type="number" required />
                        <input className={styles.inputField} {...register('inventoryInfo.supplierInfo')} placeholder="Supplier Information" required />
                    </div>
                )}

                {/* Step 4: Additional Information and Documentation */}
                {step === 4 && (
                    <div>
                        <h2 className={styles.sectionTitle}>Additional Information and Documentation</h2>
                        <textarea className={styles.inputField} {...register('additionalInfo.indications')} placeholder="Indications" required />
                        <textarea className={styles.inputField} {...register('additionalInfo.dosageInstructions')} placeholder="Dosage Instructions" required />
                        <textarea className={styles.inputField} {...register('additionalInfo.patientCounselingInfo')} placeholder="Patient Counseling Information" required />
                        <input className={styles.inputField} {...register('documentation.lotNumber')} placeholder="Lot Number" required />
                        <input className={styles.inputField} {...register('documentation.additionalDocs')} placeholder="Additional Documentation" />
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
