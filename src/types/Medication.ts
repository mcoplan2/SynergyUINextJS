export enum MedicationType {
    PILL = "PILL",
    LIQUID = "LIQUID",
    DROPS = "DROPS",
    INHALERS = "INHALERS",
}

export enum MedicationStatus {
    IN_STOCK = "IN_STOCK",
    OUT_OF_STOCK = "OUT_OF_STOCK",
    RUNNING_LOW = "RUNNING_LOW",
}

export interface Medication {
    id: number;               // Assuming medId is a number
    name: string;                // Assuming name is a string
    stock: number;               // Assuming stock is a number
    price: number;               // Assuming price is a number
    type: MedicationType;        // Use the MedicationType enum here
    status: MedicationStatus;     // Use the MedicationStatus enum here
}

export interface CreateMedication {
    name: string;                // Assuming name is a string
    stock: number;               // Assuming stock is a number
    price: number;               // Assuming price is a number
    type: MedicationType;        // Use the MedicationType enum here
    status: MedicationStatus;     // Use the MedicationStatus enum here
}

export type MedicationInfo = {
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
        patientCounselingInfo: string; // Ensure this matches the state definition
    };
    documentation: {
        lotNumber: string;
        additionalDocs: string; // Ensure this matches the state definition
    };
}