import React, { useState } from 'react';
import { Team, Question } from '../types';
import { teams } from '../data/teams';
import { teamQuestions } from '../data/questions';
import { HelpCircle, X } from 'lucide-react';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedTeam: Team | null;
  onTeamSelect: (team: Team) => void;
}

export default function QuestionModal({
  isOpen,
  onClose,
  onSuccess,
  selectedTeam,
  onTeamSelect,
}: QuestionModalProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuestion && selectedOption !== null && selectedOption === selectedQuestion.correctOption) {
      onSuccess();
    } else {
      setSelectedOption(null);
    }
  };

  const getAvailableQuestions = () => {
    if (!selectedTeam) return [];
    return teamQuestions[selectedTeam.id].filter(
      question => !selectedTeam.answeredQuestions.includes(question.id)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Choose Team & Question</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Team:</h3>
          <div className="grid grid-cols-3 gap-2">
            {teams.map((team) => (
              <button
                key={team.id}
                className={`p-2 rounded ${
                  selectedTeam?.id === team.id
                    ? 'ring-2 ring-offset-2 ring-blue-500'
                    : ''
                }`}
                style={{ backgroundColor: team.color }}
                onClick={() => {
                  onTeamSelect(team);
                  setSelectedQuestion(null);
                  setSelectedOption(null);
                }}
              >
                <span className="text-white text-sm font-medium">
                  {team.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {selectedTeam && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Choose Your Mystery Question:</h3>
              <div className="grid grid-cols-3 gap-3">
                {getAvailableQuestions().map((question) => (
                  <button
                    key={question.id}
                    className={`aspect-square flex items-center justify-center rounded-lg border-2 transition-all transform hover:scale-105 ${
                      selectedQuestion?.id === question.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => {
                      setSelectedQuestion(question);
                      setSelectedOption(null);
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <HelpCircle 
                        size={24} 
                        className={selectedQuestion?.id === question.id ? 'text-blue-500' : 'text-gray-400'}
                      />
                      <span className={`font-bold mt-1 ${
                        selectedQuestion?.id === question.id ? 'text-blue-500' : 'text-gray-600'
                      }`}>
                        #{question.id}
                      </span>
                    </div>
                  </button>
                ))}
                {getAvailableQuestions().length === 0 && (
                  <div className="col-span-3 text-gray-500 text-center py-4">
                    No more questions available for this team
                  </div>
                )}
              </div>
            </div>

            {selectedQuestion && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Question #{selectedQuestion.id}
                </h4>
                <p className="text-blue-900 mb-4">{selectedQuestion.text}</p>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-2 mb-4">
                    {selectedQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`w-full p-3 text-left rounded-lg transition-colors ${
                          selectedOption === index
                            ? 'bg-blue-500 text-white'
                            : 'bg-white hover:bg-blue-50'
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
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}