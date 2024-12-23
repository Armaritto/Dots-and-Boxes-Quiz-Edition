import { useEffect, useState } from 'react';
import { Line, Square, Team, Question } from '../types';
import { teams } from '../data/teams.ts'; // Ensure this path is correct
import QuestionModal from './QuestionModal';
import { isLineExists, findNewSquares } from '../utils/gameLogic';
import ScoreBoard from './ScoreBoard';
import SuccessModal from './SuccessModalProps';
import FailModal from './FailModalProps';
import { useLocation } from 'react-router-dom';

interface GameBoardProps {
    width: number;
    height: number;
    spacing: number;
}

export default function GameBoard({ width, height, spacing }: GameBoardProps) {
    const location = useLocation();
    const adminId = location.state?.adminId;
    const [lines, setLines] = useState<Line[]>([]);
    const [squares, setSquares] = useState<Square[]>([]);
    const [selectedLine, setSelectedLine] = useState<Line | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [gameTeams, setGameTeams] = useState<Team[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [failMessage, setFailMessage] = useState<string>('');
    const [isFailModalOpen, setIsFailModalOpen] = useState(false);

    useEffect(() => {
        const fetchTeamsData = async () => {
            try {
                const fetchedTeams = await teams(adminId);
                setGameTeams(fetchedTeams.map((team: Team) => ({
                    ...team,
                    answeredQuestions: [] as number[]
                })));
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeamsData();
    }, [adminId]);

    const handleLineClick = (startX: number, startY: number, endX: number, endY: number) => {
        if (isLineExists(lines, startX, startY, endX, endY)) return;

        setSelectedLine({ startX, startY, endX, endY });
        setIsModalOpen(true);
    };

    const handleQuestionSuccess = (correctOptionText: string) => () => {
        if (selectedLine && selectedTeam && selectedQuestion) {
            setGameTeams(prevTeams =>
                prevTeams.map(team =>
                    team.id === selectedTeam.id
                        ? {
                            ...team,
                            answeredQuestions: [...team.answeredQuestions, selectedQuestion.id]
                        }
                        : team
                )
            );

            const newLines = [...lines, { ...selectedLine, teamId: selectedTeam.id }];
            setLines(newLines);

            const newSquarePositions = findNewSquares(newLines, squares, width, height);
            if (newSquarePositions.length > 0) {
                const newSquares = [
                    ...squares,
                    ...newSquarePositions.map((pos) => ({
                        topLeftX: pos.x,
                        topLeftY: pos.y,
                        teamId: selectedTeam.id,
                    })),
                ];
                setSquares(newSquares);

                setGameTeams(prevTeams =>
                    prevTeams.map(team =>
                        team.id === selectedTeam.id
                            ? { ...team, score: team.score + newSquarePositions.length }
                            : team
                    )
                );
            }
            setSelectedLine(null);
            setSelectedTeam(null);
            setSelectedQuestion(null);
            setIsModalOpen(false);
            setSuccessMessage(correctOptionText);
            setIsSuccessModalOpen(true);
        }
    };

    const handleQuestionFail = (correctOptionText: string) => () => {
        if (selectedTeam && selectedQuestion) {
            setGameTeams(prevTeams =>
                prevTeams.map(team =>
                    team.id === selectedTeam.id
                        ? {
                            ...team,
                            answeredQuestions: [...team.answeredQuestions, selectedQuestion.id]
                        }
                        : team
                )
            );
        }
        setSelectedLine(null);
        setSelectedTeam(null);
        setSelectedQuestion(null);
        setIsModalOpen(false);
        setFailMessage(correctOptionText);
        setIsFailModalOpen(true);
    };

    const getDotNumber = (x: number, y: number) => {
        return y * width + x + 1;
    };

    const renderDots = () => {
        const dots = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                dots.push(
                    <div
                        key={`dot-${x}-${y}`}
                        className="absolute w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold transform -translate-x-3 -translate-y-3"
                        style={{
                            left: x * spacing,
                            top: y * spacing,
                        }}
                    >
                        {getDotNumber(x, y)}
                    </div>
                );
            }
        }
        return dots;
    };

    const renderLines = () => {
        const lineElements = [];
        // Horizontal lines
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width - 1; x++) {
                const line = isLineExists(lines, x, y, x + 1, y);
                lineElements.push(
                    <div
                        key={`h-${x}-${y}`}
                        className="absolute h-1 cursor-pointer hover:bg-gray-400 transition-colors"
                        style={{
                            left: x * spacing + 12,
                            top: y * spacing,
                            width: spacing - 24,
                            backgroundColor: line ? gameTeams.find(t => t.id === line.teamId)?.color : '#E5E7EB',
                        }}
                        onClick={() => handleLineClick(x, y, x + 1, y)}
                    />
                );
            }
        }
        // Vertical lines
        for (let y = 0; y < height - 1; y++) {
            for (let x = 0; x < width; x++) {
                const line = isLineExists(lines, x, y, x, y + 1);
                lineElements.push(
                    <div
                        key={`v-${x}-${y}`}
                        className="absolute w-1 cursor-pointer hover:bg-gray-400 transition-colors"
                        style={{
                            left: x * spacing,
                            top: y * spacing + 12,
                            height: spacing - 24,
                            backgroundColor: line ? gameTeams.find(t => t.id === line.teamId)?.color : '#E5E7EB',
                        }}
                        onClick={() => handleLineClick(x, y, x, y + 1)}
                    />
                );
            }
        }
        return lineElements;
    };

    const renderSquares = () => {
        return squares.map((square, index) => {
            const team = gameTeams.find(t => t.id === square.teamId);
            return (
                <div
                    key={`square-${index}`}
                    className="absolute transition-colors"
                    style={{
                        left: square.topLeftX * spacing + 12,
                        top: square.topLeftY * spacing + 12,
                        width: spacing - 24,
                        height: spacing - 24,
                        backgroundColor: team ? `${team.color}40` : 'transparent',
                    }}
                />
            );
        });
    };

    return (
        <div className="flex flex-row justify-center items-center gap-8 bg-gray-100 p-8 min-h-screen">
            <div
                className="relative bg-white rounded-lg shadow-lg p-8"
                style={{
                    width: (width - 1) * spacing,
                    height: (height - 1) * spacing,
                }}
            >
                {renderSquares()}
                {renderLines()}
                {renderDots()}
                <QuestionModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedTeam(null);
                        setSelectedQuestion(null);
                        setSelectedLine(null);
                    }}
                    onSuccess={(correctOptionText) => handleQuestionSuccess(correctOptionText)()}
                    onFail={(correctOptionText) => handleQuestionFail(correctOptionText)()}
                    selectedTeam={selectedTeam}
                    onTeamSelect={setSelectedTeam}
                    selectedQuestion={selectedQuestion}
                    onQuestionSelect={setSelectedQuestion}
                    gameTeams={gameTeams}
                />
                {isSuccessModalOpen && (
                    <SuccessModal
                        message={successMessage}
                        onClose={() => setIsSuccessModalOpen(false)}
                    />
                )}
                {isFailModalOpen && (
                    <FailModal
                        message={failMessage}
                        onClose={() => setIsFailModalOpen(false)}
                    />
                )}
            </div>
            <ScoreBoard teams={gameTeams} />
        </div>
    );
}