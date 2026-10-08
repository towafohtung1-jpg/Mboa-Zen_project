// src/data/quizLogic.ts

export type ArchetypeType = 'runner' | 'warrior' | 'guardian' | null;

type QuizOption = {
  id: string;
  labelKey: string;
  archetype: ArchetypeType;
  icon?: string;
  forceGuardian?: boolean;
};

type QuizQuestion = {
  id: string;
  questionKey: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    questionKey: 'quiz.q1.question',
    options: [
      { id: 'a', labelKey: 'quiz.q1.a', archetype: 'runner' },
      { id: 'b', labelKey: 'quiz.q1.b', archetype: 'warrior' },
      { id: 'c', labelKey: 'quiz.q1.c', archetype: 'guardian' },
    ],
  },
  {
    id: 'q2',
    questionKey: 'quiz.q2.question',
    options: [
      { id: 'a', labelKey: 'quiz.q2.a', archetype: 'runner', icon: 'walk_icon' },
      { id: 'b', labelKey: 'quiz.q2.b', archetype: 'warrior', icon: 'carry_icon' },
      { id: 'c', labelKey: 'quiz.q2.c', archetype: 'guardian', icon: 'sit_icon' },
    ],
  },
  {
    id: 'q3',
    questionKey: 'quiz.q3.question',
    options: [
      { id: 'a', labelKey: 'quiz.q3.a', archetype: 'runner', icon: 'hungry_icon' },
      { id: 'b', labelKey: 'quiz.q3.b', archetype: 'warrior', icon: 'strong_icon' },
      { id: 'c', labelKey: 'quiz.q3.c', archetype: 'guardian', icon: 'tired_icon' },
    ],
  },
  {
    id: 'q4',
    questionKey: 'quiz.q4.question',
    options: [
      { id: 'a', labelKey: 'quiz.q4.a', archetype: 'runner' },
      { id: 'b', labelKey: 'quiz.q4.b', archetype: 'guardian', forceGuardian: true },
    ],
  },
  {
    id: 'q5',
    questionKey: 'quiz.q5.question',
    options: [
      { id: 'a', labelKey: 'quiz.q5.a', archetype: 'runner', icon: 'power_icon' },
      { id: 'b', labelKey: 'quiz.q5.b', archetype: 'warrior', icon: 'muscle_icon' },
      { id: 'c', labelKey: 'quiz.q5.c', archetype: 'guardian', icon: 'balance_icon' },
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
