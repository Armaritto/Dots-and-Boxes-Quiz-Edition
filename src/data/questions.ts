import axios from 'axios';
import { Question } from '../types';

const API_URL = 'http://localhost:9000/api';

export const fetchQuestions = async (teamIds: number[]): Promise<Record<number, Question[]>> => {
  try {
    // Fetch questions and options for all teams
    const [questionsResponse, optionsResponse] = await Promise.all([
      Promise.all(teamIds.map(teamId =>
          axios.get(`${API_URL}/questions/${teamId}`)
      )),
      axios.get(`${API_URL}/options`)
    ]);

    const questions: Question[] = questionsResponse.flatMap(response => response.data);
    const options: { question_id: number; text: string; is_correct: boolean; id: number }[] = optionsResponse.data;

    if (!Array.isArray(questions) || questions.length === 0) {
      console.warn('No questions received from API');
      throw new Error('No questions available');
    }

    // Group options by question_id
    const optionsByQuestionId = options.reduce((acc: Record<number, { text: string; is_correct: boolean; id: number }[]>, option: { question_id: number; text: string; is_correct: boolean; id: number }) => {
      if (!acc[option.question_id]) {
        acc[option.question_id] = [];
      }
      acc[option.question_id].push(option);
      return acc;
    }, {});

    // Attach options to questions
    questions.forEach(question => {
      const questionOptions = optionsByQuestionId[question.id] || [];
      question.options = questionOptions.map(opt => opt.text);
      question.correctOption = questionOptions.findIndex(opt => opt.is_correct);
    });

    // Group questions by team_id
    return questions.reduce((acc, question) => {
      if (!acc[question.team_id]) {
        acc[question.team_id] = [];
      }
      acc[question.team_id].push(question);
      return acc;
    }, {} as Record<number, Question[]>);

  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const teamQuestions = async (teamIds: number[]) => await fetchQuestions(teamIds);