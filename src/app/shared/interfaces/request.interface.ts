export interface LoginRequest {
    clientId: number;
    password: string;
}

export interface RegistrationRequest {
    id: number;
    code: number;
    clientId: number;
    password: string;
    password_confirmation: string;
}

export interface ChangePasswordRequest {
    current: string;
    password: string;
    password_confirmation: string;
}

export interface GetCodeRequest {
    clientId?: string;
    phone?: string;
    action?: number;
}

export interface GetCitiesRequest {
    countryCode: string;
}

export interface CallMeRequest {
    phone: string;
}

export interface OrderRequest {
    id: string;
    firstName: string;
    lastName: string;
    personalNumber: string;
    phoneNumber: string;
}

export interface ConfirmOrderRequest {
    id: number;
    code: number;
}
