import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getQuestionsByTeam, deleteQuestion, getOptionsByQuestion } from '../services/questions';
import { getTeamsByAdmin } from '../services/teams';
import { Question, Team } from '../types/index';
import { Plus, Edit, Trash2, Play } from 'lucide-react';
import QuestionForm from '../components/QuestionForm';

export default function QuestionsPage() {
    const { admin } = useAuth();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    useEffect(() => {
        if (admin) {
            fetchTeams();
        }
    }, [admin]);

    const fetchTeams = async () => {
        try {
            if (admin) {
                const teamsData = await getTeamsByAdmin(admin.id);
                setTeams(teamsData as Team[]);
                const allQuestions = await Promise.all(
                    teamsData.map(team => getQuestionsByTeam(team.id))
                );
                const questionsWithOptions = await Promise.all(
                    allQuestions.flat().map(async (question) => {
                        const { options, correct: correctOption } = await getOptionsByQuestion(question.id);
                        return {
                            ...question,
                            options, // Include all options
                            correctOption: Number(correctOption),
                        };
                    })
                );
                setQuestions(questionsWithOptions);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await deleteQuestion(id);
                await fetchTeams();
            } catch (error) {
                console.error('Error deleting question:', error);
            }
        }
    };

    const handleStartGame = () => {
        navigate('/game', { state: { adminId: admin?.id } });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Questions Management</h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Question
                        </button>
                        <button
                            onClick={handleStartGame}
                            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            Launch Game
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                                    Question
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Team
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {questions.map((question) => {
                                const team = teams.find(t => t.id === question.team_id);
                                return (
                                    <tr key={question.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            #{question.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {question.text}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {team?.name || `Team ${question.team_id}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button
                                                onClick={() => setEditingQuestion(question)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(question.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {(isFormOpen || editingQuestion) && (
                <QuestionForm
                    question={editingQuestion}
                    teams={teams}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingQuestion(null);
                    }}
                    onSubmit={async () => {
                        await fetchTeams();
                        setIsFormOpen(false);
                        setEditingQuestion(null);
                    }}
                />
            )}
        </div>
    );
}