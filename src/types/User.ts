export enum Role {
    CUSTOMER = "CUSTOMER",
    ADMIN = "EMPLOYEE"
}

export interface AuthenticationResponse {
    token: string;
    username: string;
    firstName: string;
    lastName: string;
    role: Role;
}

export interface User {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserFormData {
    username: string;
    firstName: string;
    lastName: string;
    password?: string;
}