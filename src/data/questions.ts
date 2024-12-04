import axios from 'axios';
import { Question } from '../types';

const questionsEndpoint = 'http://localhost:9000/api/questions';
const optionsEndpoint = 'http://localhost:9000/api/options';

export const fetchQuestions = async (): Promise<Record<number, Question[]>> => {
  try {
    const [questionsResponse, optionsResponse] = await Promise.all([
      axios.get(questionsEndpoint),
      axios.get(optionsEndpoint)
    ]);

    const questions: Question[] = questionsResponse.data;
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
      question.options = optionsByQuestionId[question.id]?.map(opt => opt.text) || [];
      question.correctOption = optionsByQuestionId[question.id]?.find(opt => opt.is_correct)?.id || -1;
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

// Fetch and export teamQuestions
export const teamQuestions = await fetchQuestions();