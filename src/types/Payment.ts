// Payment.ts
import { Request } from './Request';  // Assuming the file name is Request.ts
import { Medication } from './Medication';  // Assuming the file name is Medication.ts
import { AuthenticationResponse } from './User';

export enum PayStatus {
    UNPAID = 'UNPAID',
    FULLY_PAID = 'FULLY_PAID'
}

export interface Payment {
    paymentId: number;
    amount: number;
    payStatus: PayStatus;
    reqId: Request;
    user: AuthenticationResponse;
    medicationId: Medication;
    creationDate: Date;
    updateDate: Date;
}