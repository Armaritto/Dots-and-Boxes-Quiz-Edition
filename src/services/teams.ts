import { api } from './api';

export interface Team {
    id: number;
    name: string;
    color: string;
    admin_id: number;
}

export const getTeamsByAdmin = async (adminId: number): Promise<Team[]> => {
    const response = await api.get<Team[]>(`/teams/${adminId}`);
    return response.data;
};