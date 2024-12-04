import { Team } from '../types';

interface ScoreBoardProps {
  teams: Team[];
}

export default function ScoreBoard({ teams }: ScoreBoardProps) {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {teams.map((team) => (
            <div
                key={team.id}
                className="flex items-center justify-between p-4 rounded-lg shadow-md"
                style={{ backgroundColor: `${team.color}30` }}
            >
          <span className="font-semibold text-lg" style={{ color: team.color }}>
            {team.name}
          </span>
              <span className="font-bold text-2xl">{team.score}</span>
            </div>
        ))}
      </div>
  );
}