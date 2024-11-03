export type PersonalInfo = {
    patientName: string;
    patientAddress: string;
    patientDOB: string;
};

export type MedicationInfo = {
    medicationName: string;
    dosage: number;
    frequency: number;
};

export type DoctorInsuranceInfo = {
    clinicianName: string;
    clinicianAddress: string;
    insuranceInfo: string;
};

export type RefillFormData = {
    personalInfo: PersonalInfo;
    medicationInfo: MedicationInfo;
    doctorInsuranceInfo: DoctorInsuranceInfo;
};