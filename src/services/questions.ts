import { api } from './api';

export interface Question {
    id: number;
    text: string;
    team_id: number;
    options: string[];
}

export const getQuestionsByTeam = async (teamId: number): Promise<Question[]> => {
    const response = await api.get<Question[]>(`/questions/${teamId}`);
    return response.data;
};

export const createQuestion = async (question: { text: string; team_id: number }): Promise<Question> => {
    const response = await api.post<Question>('/questions', question);
    return response.data;
};

export const updateQuestion = async (id: number, question: { text: string; team_id: number }): Promise<void> => {
    await api.put(`/questions/${id}`, question);
};

export const deleteQuestion = async (id: number): Promise<void> => {
    await api.delete(`/questions/${id}`);
};

export const getOptionsByQuestion = async (questionId: number): Promise<{ options: string[], correct: number }> => {
    const response = await api.get(`/questions/${questionId}/options`);
    let correct = 0;
    const options: string[] = [];
    for(let i = 0 ; i < response.data.length; i++){
        options[i] = response.data[i].text;
        if(response.data[i].is_correct) {
            correct = i;
        }
    }

    return {options: options, correct: correct};
}

export const createOption = async (questionId: number, option: string, isCorrect: boolean): Promise<void> => {
    console.log(await api.post(`/options`, { text: option, is_correct: isCorrect, question_id: questionId }));
}

export const updateOptions = async (questionId: number, options: string[], correctOption: number): Promise<void> => {
    await deleteOptions(questionId);
    for (let i = 0; i < options.length; i++) {
        await createOption(questionId, options[i], i === correctOption);
    }
}

export const deleteOptions = async (questionId: number): Promise<void> => {
    await api.delete(`/options/question/${questionId}`);
}