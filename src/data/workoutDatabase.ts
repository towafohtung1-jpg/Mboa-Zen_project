export type Archetype = 'runner' | 'warrior' | 'guardian';
export type WorkoutDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

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

export interface DailyWorkout {
  day: WorkoutDay;
  focus: string;
  warmup: Exercise[];
  main: Exercise[];
  cooldown: Exercise[];
  totalDuration: number;
}

export interface WeeklyPlan {
  archetype: Archetype;
  days: DailyWorkout[];
}

// ─── YOUR 10 JSON FILES ──────────────────────────────────────────────

export const allExercises: Exercise[] = [
  // ─── MAIN EXERCISES ──────────────────────────────────────────────
 {
  id: 'EX1',
  name: 'Jumping Jacks',
  description: 'Jump feet apart while raising arms overhead',
  video: '/videos/main/Female_mountain_climber.mp4',
  duration: 30,        // ← Added this line
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
    video: '/videos/main/Male_hight_kness.json',
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
    video: '/videos/main/Male_quick_feet.json',
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
    video: '/videos/main/Female_mountain_climber.json',
    duration: 40,
    archetype: 'runner,warrior',
    category: 'core',
    difficulty: 'intermediate',
    sets: 3,
    reps: 12
  },
  {
    id: 'EX5',
    name: 'Slide Jacks',
    description: 'Slide feet wide and together rhythmically',
    video: '/videos/main/Female_slides_Jacks.json',
    duration: 30,
    archetype: 'runner',
    category: 'cardio',
    difficulty: 'intermediate',
    sets: 3,
    reps: 15
  },
  {
    id: 'EX6',
    name: 'Wall Push-ups',
    description: 'Standing push-ups against a wall',
    video: '/videos/main/Female_wall_push_up.json',
    duration: 35,
    archetype: 'warrior,guardian',
    category: 'upper_body',
    difficulty: 'beginner',
    sets: 3,
    reps: 15
  },
  {
    id: 'EX7',
    name: 'Scissor Chops',
    description: 'Alternate legs crossing over each other',
    video: '/videos/main/Male_scissor_chops.json',
    duration: 30,
    archetype: 'all',
    category: 'core',
    difficulty: 'intermediate',
    sets: 3,
    reps: 12
  },
  {
    id: 'EX8',
    name: 'Plank Row',
    description: 'Plank position with alternating rowing motion',
    video: '/videos/main/Female_plank_row.json',
    duration: 35,
    archetype: 'all',
    category: 'core',
    difficulty: 'intermediate',
    sets: 3,
    reps: 10
  },

  // ─── WARMUP ──────────────────────────────────────────────────────────
  {
    id: 'WU1',
    name: 'Arm Circles',
    description: 'Roll shoulders forward and backward',
    video: '/videos/main/Male_circles.json',
    duration: 30,
    archetype: 'all',
    category: 'warmup',
    difficulty: 'beginner'
  },

  // ─── COOLDOWN ────────────────────────────────────────────────────────
  {
    id: 'CD1',
    name: 'Standing Hamstring',
    description: 'Leg extended, reach forward',
    video: '/videos/main/Female_standing_harmstring.json',
    duration: 30,
    archetype: 'all',
    category: 'cooldown',
    difficulty: 'beginner'
  },
];

// ─── HELPER FUNCTIONS ──────────────────────────────────────────────────

export const getExercisesByArchetype = (
  exercises: Exercise[],
  archetype: Archetype
): Exercise[] => {
  return exercises.filter(
    (ex) => ex.archetype === 'all' || ex.archetype.split(',').includes(archetype)
  );
};

export const getRandomExercises = (
  exercises: Exercise[],
  count: number
): Exercise[] => {
  if (exercises.length === 0) return [];
  const shuffled = [...exercises].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// ─── GENERATE WEEKLY PLAN ──────────────────────────────────────────────

export const generateWeeklyPlan = (archetype: Archetype): WeeklyPlan => {
  const days: WorkoutDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  const dayFocus: Record<WorkoutDay, string> = {
    monday: 'Cardio + Core',
    tuesday: 'Upper Body',
    wednesday: 'Active Recovery',
    thursday: 'Cardio + Core',
    friday: 'Full Body',
    saturday: 'Cardio',
    sunday: 'Rest',
  };

  const allForArchetype = getExercisesByArchetype(allExercises, archetype);
  const warmups = allForArchetype.filter(ex => ex.category === 'warmup');
  const main = allForArchetype.filter(ex => ex.category !== 'warmup' && ex.category !== 'cooldown');
  const cooldowns = allForArchetype.filter(ex => ex.category === 'cooldown');

  const dailyWorkouts: DailyWorkout[] = days.map((day) => {
    const warmup = getRandomExercises(warmups, 1);
    const mainExercises = day === 'sunday' ? [] : getRandomExercises(main, 4);
    const cooldown = day === 'sunday' ? [] : getRandomExercises(cooldowns, 1);
    
    const totalDuration = 
      warmup.reduce((sum, ex) => sum + ex.duration, 0) +
      mainExercises.reduce((sum, ex) => sum + ex.duration, 0) +
      cooldown.reduce((sum, ex) => sum + ex.duration, 0);

    return {
      day,
      focus: dayFocus[day],
      warmup,
      main: mainExercises,
      cooldown,
      totalDuration: Math.round(totalDuration / 60),
    };
  });

  return {
    archetype,
    days: dailyWorkouts,
  };
};

export default {
  allExercises,
  generateWeeklyPlan,
  getExercisesByArchetype,
  getRandomExercises,
};