import { api } from './api';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface Admin {
    id: number;
    username: string;
}

export const login = async (credentials: LoginCredentials): Promise<Admin> => {
    const response = await api.post<Admin>('/auth/login', credentials);
    return response.data;
};