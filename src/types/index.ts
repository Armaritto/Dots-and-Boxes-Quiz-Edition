export interface Team {
  id: number;
  name: string;
  color: string;
  score: number;
  answeredQuestions: number[],
  admin_id: number;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
  team_id: number;
}

export interface Admin {
  id: number;
  username: string;
  name: string;
}

export interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  teamId?: number;
}

export interface Square {
  topLeftX: number;
  topLeftY: number;
  teamId?: number;
}