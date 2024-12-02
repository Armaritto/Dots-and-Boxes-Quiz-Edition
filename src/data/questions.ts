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
    {
      id: 4,
      text: 'What is 15 + 26?',
      options: ['39', '40', '41', '42'],
      correctOption: 2
    },
    {
      id: 5,
      text: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Mars', 'Mercury', 'Earth'],
      correctOption: 2
    },
    {
      id: 6,
      text: 'How many minutes are in 2 hours?',
      options: ['90', '100', '120', '140'],
      correctOption: 2
    }
  ],
  2: [ // Blue Team
    {
      id: 7,
      text: 'What is 12 x 5?',
      options: ['55', '60', '65', '70'],
      correctOption: 1
    },
    {
      id: 8,
      text: 'What is the capital of Italy?',
      options: ['Milan', 'Venice', 'Rome', 'Florence'],
      correctOption: 2
    },
    {
      id: 9,
      text: 'How many planets are in our solar system?',
      options: ['7', '8', '9', '10'],
      correctOption: 1
    },
    {
      id: 10,
      text: 'What is 48 ÷ 6?',
      options: ['6', '7', '8', '9'],
      correctOption: 2
    },
    {
      id: 11,
      text: 'Which is the largest ocean?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      correctOption: 3
    },
    {
      id: 12,
      text: 'How many days are in February in a leap year?',
      options: ['27', '28', '29', '30'],
      correctOption: 2
    }
  ],
  3: [ // Green Team
    {
      id: 13,
      text: 'What is 9 x 7?',
      options: ['61', '62', '63', '64'],
      correctOption: 2
    },
    {
      id: 14,
      text: 'What is the capital of Germany?',
      options: ['Munich', 'Hamburg', 'Berlin', 'Frankfurt'],
      correctOption: 2
    },
    {
      id: 15,
      text: 'How many continents are there?',
      options: ['5', '6', '7', '8'],
      correctOption: 2
    },
    {
      id: 16,
      text: 'What is 32 + 45?',
      options: ['75', '76', '77', '78'],
      correctOption: 2
    },
    {
      id: 17,
      text: 'Which is the smallest prime number?',
      options: ['0', '1', '2', '3'],
      correctOption: 2
    },
    {
      id: 18,
      text: 'How many sides does a pentagon have?',
      options: ['4', '5', '6', '7'],
      correctOption: 1
    }
  ],
  4: [ // Purple Team
    {
      id: 19,
      text: 'What is 6 x 8?',
      options: ['46', '47', '48', '49'],
      correctOption: 2
    },
    {
      id: 20,
      text: 'What is the capital of Japan?',
      options: ['Osaka', 'Kyoto', 'Tokyo', 'Yokohama'],
      correctOption: 2
    },
    {
      id: 21,
      text: 'How many colors are in a rainbow?',
      options: ['5', '6', '7', '8'],
      correctOption: 2
    },
    {
      id: 22,
      text: 'What is 54 ÷ 9?',
      options: ['4', '5', '6', '7'],
      correctOption: 2
    },
    {
      id: 23,
      text: 'Which is the hottest planet?',
      options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
      correctOption: 1
    },
    {
      id: 24,
      text: 'How many faces does a cube have?',
      options: ['4', '5', '6', '8'],
      correctOption: 2
    }
  ],
  5: [ // Yellow Team
    {
      id: 25,
      text: 'What is 5 x 9?',
      options: ['43', '44', '45', '46'],
      correctOption: 2
    },
    {
      id: 26,
      text: 'What is the capital of Brazil?',
      options: ['Rio de Janeiro', 'São Paulo', 'Brasilia', 'Salvador'],
      correctOption: 2
    },
    {
      id: 27,
      text: 'How many legs does a spider have?',
      options: ['6', '8', '10', '12'],
      correctOption: 1
    },
    {
      id: 28,
      text: 'What is 17 + 38?',
      options: ['53', '54', '55', '56'],
      correctOption: 2
    },
    {
      id: 29,
      text: 'How many months have 31 days?',
      options: ['5', '6', '7', '8'],
      correctOption: 2
    },
    {
      id: 30,
      text: 'What is 100 ÷ 4?',
      options: ['20', '25', '30', '35'],
      correctOption: 1
    }
  ],
  6: [ // Pink Team
    {
      id: 31,
      text: 'What is 4 x 7?',
      options: ['26', '27', '28', '29'],
      correctOption: 2
    },
    {
      id: 32,
      text: 'What is the capital of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
      correctOption: 2
    },
    {
      id: 33,
      text: 'How many days are in a week?',
      options: ['5', '6', '7', '8'],
      correctOption: 2
    },
    {
      id: 34,
      text: 'What is 23 + 59?',
      options: ['80', '81', '82', '83'],
      correctOption: 2
    },
    {
      id: 35,
      text: 'How many zeros are in one thousand?',
      options: ['1', '2', '3', '4'],
      correctOption: 2
    },
    {
      id: 36,
      text: 'What is 81 ÷ 9?',
      options: ['7', '8', '9', '10'],
      correctOption: 2
    }
  ]
};