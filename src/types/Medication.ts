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
    medId: number;               // Assuming medId is a number
    name: string;                // Assuming name is a string
    stock: number;               // Assuming stock is a number
    price: number;               // Assuming price is a number
    type: MedicationType;        // Use the MedicationType enum here
    status: MedicationStatus;     // Use the MedicationStatus enum here
}