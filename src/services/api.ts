import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

export const api = axios.create({
    baseURL: API_URL,
});

export const setAuthToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    delete api.defaults.headers.common['Authorization'];
};