import axios from 'axios';
import { Team } from '../types';

const teamsEndpoint = 'http://localhost:9000/api/teams';

export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const response = await axios.get(teamsEndpoint);
    const teams: Omit<Team, 'score' | 'answeredQuestions'>[] = response.data;

    if (!Array.isArray(teams) || teams.length === 0) {
      console.warn('No teams received from API');
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
    const dynamicTeams: Team[] = validTeams.map(team => ({
      ...team,
      score: 0,
      answeredQuestions: []
    }));

    return dynamicTeams;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

// Fetch and export teams
export const teams = await fetchTeams();