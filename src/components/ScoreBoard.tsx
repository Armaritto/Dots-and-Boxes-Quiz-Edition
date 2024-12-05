import { FC } from 'react';
import { Team } from '../types';
import { Trophy } from 'lucide-react';
import { GameHeader } from './GameHeader.tsx';

interface ScoreBoardProps {
    teams: Team[];
}

export const ScoreBoard: FC<ScoreBoardProps> = ({ teams }) => {
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

    return (
        <div>
            <GameHeader adminName="milad 25" />
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Leaderboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedTeams.map((team, index) => (
                        <div
                            key={team.id}
                            className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:shadow-md"
                            style={{ backgroundColor: `${team.color}10` }}
                        >
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: team.color }}
                            >
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{team.name}</h3>
                                <p className="text-sm text-gray-600">Score: {team.score}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;