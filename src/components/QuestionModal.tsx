import React, { useState, useEffect } from 'react';
import { Team, Question } from '../types';
import { teamQuestions } from '../data/questions';
import { HelpCircle, X } from 'lucide-react';

interface QuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (correctOptionText: string) => void;
    onFail: (correctOptionText: string) => void;
    selectedTeam: Team | null;
    onTeamSelect: (team: Team) => void;
    selectedQuestion: Question | null;
    onQuestionSelect: (question: Question | null) => void;
    gameTeams: Team[];
}

export default function QuestionModal({
                                          isOpen,
                                          onClose,
                                          onSuccess,
                                          onFail,
                                          selectedTeam,
                                          onTeamSelect,
                                          selectedQuestion,
                                          onQuestionSelect,
                                          gameTeams,
                                      }: QuestionModalProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedQuestion && selectedOption !== null) {
            const correctOptionText = selectedQuestion.options[selectedQuestion.correctOption];
            if (selectedOption === selectedQuestion.correctOption) {
                onSuccess(correctOptionText);
            } else {
                onFail(correctOptionText);
            }
        } else {
            throw new Error('Invalid question or option');
        }
    };

    const getAvailableQuestions = async () => {
        if (!selectedTeam) return [];
        const currentTeam = gameTeams.find(team => team.id === selectedTeam.id);
        if (!currentTeam) return [];
        const questions = await teamQuestions([selectedTeam.id]);
        if (!questions) return [];
        const availableQuestions = (questions[selectedTeam.id] || []).filter(
            (question: Question) => !currentTeam.answeredQuestions.includes(question.id)
        );
        console.log("availableQuestions", typeof availableQuestions);
        return availableQuestions;
    };

    const isQuestionAnswered = (questionId: number) => {
        if (!selectedTeam) return false;
        const currentTeam = gameTeams.find(team => team.id === selectedTeam.id);
        return currentTeam?.answeredQuestions.includes(questionId) || false;
    };

    useEffect(() => {
        const fetchAvailableQuestions = async () => {
            const questions = await getAvailableQuestions();
            setAvailableQuestions(questions);
        };
        fetchAvailableQuestions();
    }, [selectedTeam, gameTeams]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Choose Team & Question</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {/* Team Selection */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Select Team:</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {gameTeams.map((team) => (
                                <button
                                    key={team.id}
                                    className={`p-3 rounded-lg transition-all ${
                                        selectedTeam?.id === team.id
                                            ? 'ring-2 ring-offset-2 ring-blue-500 transform scale-105'
                                            : 'hover:scale-105'
                                    }`}
                                    style={{ backgroundColor: team.color }}
                                    onClick={() => {
                                        onTeamSelect(team);
                                        onQuestionSelect(null);
                                        setSelectedOption(null);
                                    }}
                                >
                  <span className="text-white font-medium">
                    {team.name}
                  </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedTeam && (
                        <>
                            {/* Question Selection */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3 text-gray-700">Choose Your Mystery Question:</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                    {availableQuestions.map((question: Question) => {
                                        const isAnswered = isQuestionAnswered(question.id);
                                        return (
                                            <button
                                                key={question.id}
                                                className={`aspect-square flex items-center justify-center rounded-lg border-2 transition-all ${
                                                    isAnswered
                                                        ? 'opacity-50 cursor-not-allowed bg-gray-100'
                                                        : selectedQuestion?.id === question.id
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'border-gray-200 hover:border-blue-300 hover:scale-105'
                                                }`}
                                                onClick={() => {
                                                    if (!isAnswered) {
                                                        onQuestionSelect(question);
                                                        setSelectedOption(null);
                                                    }
                                                }}
                                                disabled={isAnswered}
                                            >
                                                <div className="flex flex-col items-center">
                                                    <HelpCircle
                                                        size={20}
                                                        className={
                                                            isAnswered
                                                                ? 'text-gray-400'
                                                                : selectedQuestion?.id === question.id
                                                                    ? 'text-blue-500'
                                                                    : 'text-gray-400'
                                                        }
                                                    />
                                                    <span className={`font-bold mt-1 text-sm ${
                                                        isAnswered
                                                            ? 'text-gray-400'
                                                            : selectedQuestion?.id === question.id
                                                                ? 'text-blue-500'
                                                                : 'text-gray-600'
                                                    }`}>
                            #{question.id}
                          </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                                {availableQuestions.length === 0 && (
                                    <div className="text-gray-500 text-center mt-4">
                                        No more questions available for this team
                                    </div>
                                )}
                            </div>

                            {/* Question Display */}
                            {selectedQuestion && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 mb-3">
                                        Question #{selectedQuestion.id}
                                    </h4>
                                    <p className="text-blue-900 mb-4 text-lg">{selectedQuestion.text}</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-3 mb-4">
                                            {selectedQuestion.options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className={`w-full p-4 text-left rounded-lg transition-colors ${
                                                        selectedOption === index
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-white text-gray-800 hover:bg-blue-50'
                                                    }`}
                                                    onClick={() => setSelectedOption(index)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={selectedOption === null}
                                            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                        >
                                            Submit Answer
                                        </button>
                                    </form>

                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}