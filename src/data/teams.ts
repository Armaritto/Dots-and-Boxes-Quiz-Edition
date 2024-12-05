import axios from 'axios';
import {Team} from '../types';

const API_URL = 'http://localhost:9000/api';

export const fetchTeams = async (adminId: number): Promise<Team[]> => {
  try {
    const response = await axios.get(`${API_URL}/teams/${adminId}`);
    const teams: Omit<Team, 'score' | 'answeredQuestions'>[] = response.data;

    if (!Array.isArray(teams) || teams.length === 0) {
      console.warn('No teams received from API');
      console.log(adminId)
      throw new Error('No teams available');
    }

    // Validate team structure
    const isValidTeam = (t: unknown): t is Omit<Team, 'score' | 'answeredQuestions'> => {
      if (typeof t !== 'object' || t === null) return false;

      const team = t as { [key: string]: unknown };
      return (
          typeof team.id === 'number' &&
          typeof team.name === 'string' &&
          typeof team.color === 'string'
      );
    };

    const validTeams = teams.filter(isValidTeam);
    if (validTeams.length === 0) {
      throw new Error('No valid teams');
    }

    // Add dynamic properties
    return validTeams.map(team => ({
      ...team,
      score: 0,
      answeredQuestions: []
    }));
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const teams = async (adminId: number) => await fetchTeams(adminId);