// ─── src/data/quizLogic.ts ──────────────────────────────────────────────

export type ArchetypeType = 'runner' | 'warrior' | 'guardian';

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    label: string;
    archetype: ArchetypeType;
    icon?: string;
    image?: string;
    forceGuardian?: boolean;
  }[];
}

export interface QuizResult {
  archetype: ArchetypeType;
  scores: {
    runner: number;
    warrior: number;
    guardian: number;
  };
  tieBroken: boolean;
}

// ─── QUIZ QUESTIONS ──────────────────────────────────────────────────────

export const quizQuestions: QuizQuestion[] = [
  // Q1: BODY - With images
  {
    id: 1,
    question: 'Which body type looks like you?',
    options: [
      {
        id: 'runner',
        label: 'Slim, long, light - like plantain tree 🌴',
        archetype: 'runner',
        image: 'plantain_tree.png',
      },
      {
        id: 'warrior',
        label: 'Solid, broad, strong - like iroko tree 🌳',
        archetype: 'warrior',
        image: 'iroko_tree.png',
      },
      {
        id: 'guardian',
        label: 'Steady, soft, balanced - like mango tree 🌿',
        archetype: 'guardian',
        image: 'mango_tree.png',
      },
    ],
  },
  // Q2: DAILY WORK - Cameroon Real Life
  {
    id: 2,
    question: 'What do you do every day?',
    options: [
      {
        id: 'runner',
        label: 'I walk plenty - school, market, farm 🚶',
        archetype: 'runner',
        icon: '🚶',
      },
      {
        id: 'warrior',
        label: 'I carry heavy things, push, build 💪',
        archetype: 'warrior',
        icon: '💪',
      },
      {
        id: 'guardian',
        label: 'I sit - shop, office, house 🪑',
        archetype: 'guardian',
        icon: '🪑',
      },
    ],
  },
  // Q3: CHOP/ENERGY
  {
    id: 3,
    question: 'After you eat a big meal, how do you feel?',
    options: [
      {
        id: 'runner',
        label: 'Hungry again quick - fast burn 🔥',
        archetype: 'runner',
        icon: '🔥',
      },
      {
        id: 'warrior',
        label: 'Strong for long work ⚡',
        archetype: 'warrior',
        icon: '⚡',
      },
      {
        id: 'guardian',
        label: 'Tired if I eat too much 😴',
        archetype: 'guardian',
        icon: '😴',
      },
    ],
  },
  // Q4: HEALTH/SAFETY - This can FORCE GUARDIAN
  {
    id: 4,
    question: 'Do you have any pain or special condition?',
    options: [
      {
        id: 'runner',
        label: 'No, I can do anything ✅',
        archetype: 'runner',
        icon: '✅',
      },
      {
        id: 'warrior',
        label: 'No, I am strong 💪',
        archetype: 'warrior',
        icon: '💪',
      },
      {
        id: 'guardian',
        label: 'Yes - knee/back pain, big belly, recently gave birth, 50+ years, doctor says no jumping 🩺',
        archetype: 'guardian',
        icon: '🩺',
        forceGuardian: true,
      },
    ],
  },
  // Q5: GOAL
  {
    id: 5,
    question: 'What is your main goal?',
    options: [
      {
        id: 'runner',
        label: 'Get power for walking, no tired 🏃',
        archetype: 'runner',
        icon: '🏃',
      },
      {
        id: 'warrior',
        label: 'Get muscle, strong hands 💪',
        archetype: 'warrior',
        icon: '💪',
      },
      {
        id: 'guardian',
        label: 'Balance and feel fine 🧘',
        archetype: 'guardian',
        icon: '🧘',
      },
    ],
  },
];

// ─── QUIZ SCORING LOGIC ─────────────────────────────────────────────────

export const calculateQuizResult = (
  answers: ArchetypeType[]
): QuizResult => {
  // Initialize scores
  const scores = { runner: 0, warrior: 0, guardian: 0 };

  // Count answers (Q1-Q5)
  answers.forEach((answer) => {
    if (answer === 'runner') scores.runner++;
    else if (answer === 'warrior') scores.warrior++;
    else if (answer === 'guardian') scores.guardian++;
  });

  // Determine winner
  let winner: ArchetypeType = 'guardian'; // Default safest
  let maxScore = 0;

  Object.entries(scores).forEach(([key, value]) => {
    if (value > maxScore) {
      maxScore = value;
      winner = key as ArchetypeType;
    }
  });

  // Check for ties
  const tied = Object.values(scores).filter((v) => v === maxScore).length > 1;
  let tieBroken = false;

  if (tied) {
    tieBroken = true;
    // Tie breaker: Q1 Body is boss (first answer)
    // If still tie, return Guardian (safest)
    if (answers[0]) {
      winner = answers[0];
    } else {
      winner = 'guardian';
    }
  }

  return {
    archetype: winner,
    scores,
    tieBroken,
  };
};

// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────

export const getArchetypeLabel = (archetype: ArchetypeType): string => {
  const labels = {
    runner: 'The Swift - Fast Leg',
    warrior: 'The Strong - Strong Hand',
    guardian: 'The Steady - Strong Heart',
  };
  return labels[archetype];
};

export const getArchetypeDescription = (archetype: ArchetypeType): string => {
  const descriptions = {
    runner: 'You move fast, walk plenty, burn energy quick',
    warrior: 'You carry heavy, work hard, need strength',
    guardian: 'You balance life, need steady health',
  };
  return descriptions[archetype];
};

export const getArchetypeEmoji = (archetype: ArchetypeType): string => {
  const emojis = {
    runner: '🏃',
    warrior: '💪',
    guardian: '🧘',
  };
  return emojis[archetype];
};