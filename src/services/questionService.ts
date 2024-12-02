import { pool } from '../db/config';
import { Question } from '../types';

export async function getTeamQuestions(teamId: number): Promise<Question[]> {
  const [rows] = await pool.execute(`
    SELECT q.id, q.text, q.correct_option, 
           GROUP_CONCAT(o.option_text ORDER BY o.option_order) as options
    FROM questions q
    JOIN options o ON q.id = o.question_id
    WHERE q.team_id = ?
    GROUP BY q.id
  `, [teamId]);

  return (rows as any[]).map(row => ({
    id: row.id,
    text: row.text,
    options: row.options.split(','),
    correctOption: row.correct_option
  }));
}

export async function markQuestionAsAnswered(teamId: number, questionId: number): Promise<void> {
  await pool.execute(
    'INSERT INTO answered_questions (team_id, question_id) VALUES (?, ?)',
    [teamId, questionId]
  );
}

export async function getAnsweredQuestions(teamId: number): Promise<number[]> {
  const [rows] = await pool.execute(
    'SELECT question_id FROM answered_questions WHERE team_id = ?',
    [teamId]
  );
  return (rows as any[]).map(row => row.question_id);
}