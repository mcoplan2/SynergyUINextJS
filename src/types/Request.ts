import { Medication } from "./Medication";
import { AuthenticationResponse } from "./User";

export enum RequestType {
    OPEN = "OPEN",
    APPROVED = "APPROVED",
    DENIED = "DENIED",
}

export interface Request {
    requestId: number;          
    dosageCount: number;        
    dosageFreq: number;         
    user: AuthenticationResponse;                 
    med: Medication;            
    requestType: RequestType;        
}

export interface ReqId {
    dosageCount: number;
    dosageFreq: number;
    user: AuthenticationResponse; // User associated with the request
    med: Medication; // Medication details
    paymentId: number;
    requestType: string;
    id: number;
}

export interface RefillRequest {
    paymentId: number;
    amount: number;
    payStatus: string;
    user: AuthenticationResponse; // User making the payment
    creationDate: string;
    updateDate: string;
    reqId: ReqId; // Details of the refill request
    medicationId: Medication; // Medication details
}