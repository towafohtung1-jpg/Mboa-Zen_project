// src/data/quizLogic.ts
export type ArchetypeType = 'runner' | 'warrior' | 'guardian' | null;

type QuizOption = {
  id: string;
  label: string;
  archetype: ArchetypeType;
  icon?: string;
  forceGuardian?: boolean;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which body type looks like you?',
    options: [
      { id: 'a', label: 'Slim, long, light - like plantain tree', archetype: 'runner', icon: '🌴' },
      { id: 'b', label: 'Solid, broad, strong - like iroko tree', archetype: 'warrior', icon: '🌳' },
      { id: 'c', label: 'Steady, soft, balanced - like mango tree', archetype: 'guardian', icon: '🥭' },
    ],
  },
  {
    id: 'q2',
    question: 'What do you do every day?',
    options: [
      { id: 'a', label: 'I walk a lot - school, market, farm', archetype: 'runner', icon: '🚶' },
      { id: 'b', label: 'I carry heavy things, push, build', archetype: 'warrior', icon: '💪' },
      { id: 'c', label: 'I sit at shop, office, or home', archetype: 'guardian', icon: '🪑' },
    ],
  },
  {
    id: 'q3',
    question: 'After eating fufu, how do you feel?',
    options: [
      { id: 'a', label: 'Hungry again quickly (fast burn)', archetype: 'runner', icon: '🍽️' },
      { id: 'b', label: 'Strong for long work', archetype: 'warrior', icon: '💪' },
      { id: 'c', label: 'Tired if I eat too much', archetype: 'guardian', icon: '😴' },
    ],
  },
  {
    id: 'q4',
    question: 'Do you have any pain or special condition?',
    options: [
      { id: 'a', label: 'No, I can do anything', archetype: 'runner' },
      { id: 'b', label: 'Yes: knee/back pain, big belly, gave birth, 50+, doctor says no jump', archetype: 'guardian', forceGuardian: true },
    ],
  },
  {
    id: 'q5',
    question: 'What is your goal?',
    options: [
      { id: 'a', label: 'I want power for walking, no tiredness', archetype: 'runner', icon: '🏃' },
      { id: 'b', label: 'I want muscle, strong hands', archetype: 'warrior', icon: '💪' },
      { id: 'c', label: 'I want balance, to feel fine', archetype: 'guardian', icon: '⚖️' },
    ],
  },
];

export const calculateQuizResult = (answers: ArchetypeType[]): { archetype: ArchetypeType } => {
  const votes = { runner: 0, warrior: 0, guardian: 0 };
  answers.forEach(a => { if (a) votes[a]++; });

  let maxVotes = 0;
  let result: ArchetypeType = 'guardian';
  for (const [archetype, count] of Object.entries(votes)) {
    if (count > maxVotes) { maxVotes = count; result = archetype as ArchetypeType; }
  }

  if (maxVotes === 2) {
    const firstAnswer = answers[0];
    if (firstAnswer) result = firstAnswer;
  }

  return { archetype: result };
};