import React from 'react';
import { Team } from '../types';

interface ScoreBoardProps {
  teams: Team[];
}

export default function ScoreBoard({ teams }: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
      {teams.map((team) => (
        <div
          key={team.id}
          className="flex items-center justify-between p-3 rounded-lg"
          style={{ backgroundColor: `${team.color}20` }}
        >
          <span className="font-medium" style={{ color: team.color }}>
            {team.name}
          </span>
          <span className="font-bold text-lg">{team.score}</span>
        </div>
      ))}
    </div>
  );
}