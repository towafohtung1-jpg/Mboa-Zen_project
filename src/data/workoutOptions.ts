export interface Exercise {
  id: string;
  name: string;
  description: string;
  video: string;
  duration: number;
  archetype: string;
  category: string;
  difficulty: string;
  sets?: number;
  reps?: number;
}

// ─── EXERCISES BY ARCHETYPE ──────────────────────────────────────────

export const getExercisesForArchetype = (archetype: string): Exercise[] => {
  const allExercises: Exercise[] = [
    // ─── RUNNER (Slim Body) - Cardio Focus ──────────────────────────
    {
      id: 'EX1',
      name: 'Jumping Jacks',
      description: 'Jump feet apart while raising arms overhead',
      video: '/videos/main/Male_jumping_jack.mp4',
      duration: 30,
      archetype: 'runner',
      category: 'cardio',
      difficulty: 'beginner',
      sets: 3,
      reps: 15
    },
    {
      id: 'EX2',
      name: 'High Knees',
      description: 'March in place, drive knees to chest height',
      video: '/videos/main/Male_hight_kness.mp4',
      duration: 30,
      archetype: 'runner',
      category: 'cardio',
      difficulty: 'beginner',
      sets: 3,
      reps: 20
    },
    {
      id: 'EX3',
      name: 'Quick Feet',
      description: 'Fast feet movement staying light on toes',
      video: '/videos/main/Male_quick_feet.mp4',
      duration: 25,
      archetype: 'runner',
      category: 'cardio',
      difficulty: 'intermediate',
      sets: 3,
      reps: 20
    },
    {
      id: 'EX4',
      name: 'Mountain Climber',
      description: 'Plank position, alternate knees to chest',
      video: '/videos/main/Female_mountain_climber.mp4',
      duration: 40,
      archetype: 'runner',
      category: 'core',
      difficulty: 'intermediate',
      sets: 3,
      reps: 12
    },
    {
      id: 'EX5',
      name: 'Slide Jacks',
      description: 'Slide feet wide and together rhythmically',
      video: '/videos/main/Female_slides_Jacks.mp4',
      duration: 30,
      archetype: 'runner',
      category: 'cardio',
      difficulty: 'intermediate',
      sets: 3,
      reps: 15
    },
    {
      id: 'EX6',
      name: 'Burpees',
      description: 'Squat, kick feet back, push-up, jump up',
      video: '/videos/main/Female_mountain_climber.mp4',
      duration: 30,
      archetype: 'runner',
      category: 'full_body',
      difficulty: 'advanced',
      sets: 3,
      reps: 8
    },

    // ─── WARRIOR (Strong Body) - Strength Focus ─────────────────────
    {
      id: 'EX7',
      name: 'Wall Push-ups',
      description: 'Standing push-ups against a wall',
      video: '/videos/main/Female_wall_push_up.mp4',
      duration: 35,
      archetype: 'warrior',
      category: 'upper_body',
      difficulty: 'beginner',
      sets: 3,
      reps: 15
    },
    {
      id: 'EX8',
      name: 'Chair Dips',
      description: 'Dips using a sturdy chair',
      video: '/videos/main/Female_mountain_climber.mp4',
      duration: 40,
      archetype: 'warrior',
      category: 'upper_body',
      difficulty: 'intermediate',
      sets: 3,
      reps: 12
    },
    {
      id: 'EX9',
      name: 'Squats',
      description: 'Deep squats using bodyweight only',
      video: '/videos/main/Female_mountain_climber.mp4',
      duration: 45,
      archetype: 'warrior',
      category: 'lower_body',
      difficulty: 'beginner',
      sets: 3,
      reps: 15
    },
    {
      id: 'EX10',
      name: 'Plank Hold',
      description: 'Hold plank position - body in straight line',
      video: '/videos/main/Female_plank_row.mp4',
      duration: 30,
      archetype: 'warrior',
      category: 'core',
      difficulty: 'beginner',
      sets: 3,
      reps: 5
    },

    // ─── GUARDIAN (Steady Body) - Balance Focus ─────────────────────
    {
      id: 'EX11',
      name: 'Lunges',
      description: 'Forward lunges alternating legs',
      video: '/videos/main/Female_mountain_climber.mp4',
      duration: 40,
      archetype: 'guardian',
      category: 'lower_body',
      difficulty: 'beginner',
      sets: 3,
      reps: 12
    },
    {
      id: 'EX12',
      name: 'Calf Raises',
      description: 'Rise up on toes, lower slowly',
      video: '/videos/main/Male_quick_feet.mp4',
      duration: 30,
      archetype: 'guardian',
      category: 'lower_body',
      difficulty: 'beginner',
      sets: 3,
      reps: 20
    },
    {
      id: 'EX13',
      name: 'Scissor Chops',
      description: 'Alternate legs crossing over each other',
      video: '/videos/main/Male_scissor_chops.mp4',
      duration: 30,
      archetype: 'guardian',
      category: 'core',
      difficulty: 'intermediate',
      sets: 3,
      reps: 12
    },
    {
      id: 'EX14',
      name: 'Arm Circles',
      description: 'Roll shoulders forward and backward',
      video: '/videos/main/Male_circles.mp4',
      duration: 30,
      archetype: 'guardian',
      category: 'warmup',
      difficulty: 'beginner',
      sets: 3,
      reps: 10
    },
  ];

  // Filter exercises by archetype
  return allExercises.filter(ex => ex.archetype === archetype);
};