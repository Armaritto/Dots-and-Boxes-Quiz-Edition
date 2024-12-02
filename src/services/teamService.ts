import { pool } from '../db/config';
import { Team } from '../types';

export async function getAllTeams(): Promise<Team[]> {
  const [rows] = await pool.execute(`
    SELECT t.*, 
           GROUP_CONCAT(aq.question_id) as answered_questions
    FROM teams t
    LEFT JOIN answered_questions aq ON t.id = aq.team_id
    GROUP BY t.id
  `);

  return (rows as any[]).map(row => ({
    id: row.id,
    name: row.name,
    color: row.color,
    score: row.score,
    answeredQuestions: row.answered_questions ? 
      row.answered_questions.split(',').map(Number) : []
  }));
}

export async function updateTeamScore(teamId: number, newScore: number): Promise<void> {
  await pool.execute(
    'UPDATE teams SET score = ? WHERE id = ?',
    [newScore, teamId]
  );
}