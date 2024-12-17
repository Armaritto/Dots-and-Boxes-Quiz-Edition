import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api';

export const api = axios.create({
    baseURL: API_URL,
});

export const setAuthToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    delete api.defaults.headers.common['Authorization'];
};