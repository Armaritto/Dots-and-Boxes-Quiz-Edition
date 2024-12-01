import { Question } from '../types';

export const teamQuestions: Record<number, Question[]> = {
  1: [ // Red Team
    {
      id: 1,
      text: 'What is 7 x 8?',
      options: ['54', '56', '58', '60'],
      correctOption: 1
    },
    {
      id: 2,
      text: 'What is the capital of Spain?',
      options: ['Barcelona', 'Madrid', 'Seville', 'Valencia'],
      correctOption: 1
    },
    {
      id: 3,
      text: 'How many sides does a hexagon have?',
      options: ['5', '6', '7', '8'],
      correctOption: 1
    },
  ],
  2: [ // Blue Team
    {
      id: 4,
      text: 'What is 12 x 5?',
      options: ['55', '60', '65', '70'],
      correctOption: 1
    },
    {
      id: 5,
      text: 'What is the capital of Italy?',
      options: ['Milan', 'Venice', 'Rome', 'Florence'],
      correctOption: 2
    },
    {
      id: 6,
      text: 'How many planets are in our solar system?',
      options: ['7', '8', '9', '10'],
      correctOption: 1
    },
  ],
  3: [ // Green Team
    {
      id: 7,
      text: 'What is 9 x 7?',
      options: ['61', '62', '63', '64'],
      correctOption: 2
    },
    {
      id: 8,
      text: 'What is the capital of Germany?',
      options: ['Munich', 'Hamburg', 'Berlin', 'Frankfurt'],
      correctOption: 2
    },
    {
      id: 9,
      text: 'How many continents are there?',
      options: ['5', '6', '7', '8'],
      correctOption: 2
    },
  ],
  4: [ // Purple Team
    {
      id: 10,
      text: 'What is 6 x 8?',
      options: ['46', '47', '48', '49'],
      correctOption: 2
    },
    {
      id: 11,
      text: 'What is the capital of Japan?',
      options: ['Osaka', 'Kyoto', 'Tokyo', 'Yokohama'],
      correctOption: 2
    },
    {
      id: 12,
      text: 'How many colors are in a rainbow?',
      options: ['5', '6', '7', '8'],
      correctOption: 2
    },
  ],
  5: [ // Yellow Team
    {
      id: 13,
      text: 'What is 5 x 9?',
      options: ['43', '44', '45', '46'],
      correctOption: 2
    },
    {
      id: 14,
      text: 'What is the capital of Brazil?',
      options: ['Rio de Janeiro', 'São Paulo', 'Brasilia', 'Salvador'],
      correctOption: 2
    },
    {
      id: 15,
      text: 'How many legs does a spider have?',
      options: ['6', '8', '10', '12'],
      correctOption: 1
    },
  ],
  6: [ // Pink Team
    {
      id: 16,
      text: 'What is 4 x 7?',
      options: ['26', '27', '28', '29'],
      correctOption: 2
    },
    {
      id: 17,
      text: 'What is the capital of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
      correctOption: 2
    },
    {
      id: 18,
      text: 'How many days are in a week?',
      options: ['5', '6', '7', '8'],
      correctOption: 2
    },
  ],
};