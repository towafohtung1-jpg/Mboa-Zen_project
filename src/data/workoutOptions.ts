export interface Exercise {
  id: string;
  name: string;
  description: string;
  description_pidgin: string;
  description_fr: string;
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
      description_pidgin: 'Jump throw feet outside while you dey raise your hand pass your head.',
      description_fr: 'Sauter pieds écartés en levant les bras au-dessus de la tête.',
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
      description_pidgin: 'March for one place, push your knees up make e reach your chest level.',
      description_fr: 'Marchez sur place, montez les genoux à hauteur de poitrine.',
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
      description_pidgin: 'Tap your feet fast-fast for ground while you stay light on your toe-toe.',
      description_fr: 'Tapez des pieds rapidement en restant léger sur les orteils.',
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
      description_pidgin: 'Stay like say you wan push-up, dey push knees one by one reach chest.',
      description_fr: 'En position de planche, montez les genoux vers la poitrine en alternance.',
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
      description_pidgin: 'Slide your feet wide and put am back together with correct rhythm.',
      description_fr: 'Glissez les pieds largement puis ramenez-les avec un bon rythme.',
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
      description_pidgin: 'Squat down, kick feet behind, push-up, then jump up high with power!',
      description_fr: 'Squat, reculez les pieds, pompe, puis sautez haut avec puissance !',
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
      description_pidgin: 'Stand face wall make you dey push-up against am without stress.',
      description_fr: 'Tenez-vous face au mur pour faire des pompes contre lui sans effort.',
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
      description_pidgin: 'Put hands for strong chair make you dey lower and raise your body.',
      description_fr: 'Mains sur une chaise solide pour abaisser et remonter le corps.',
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
      description_pidgin: 'Bend down deep like say you wan sit down, using body weight only.',
      description_fr: 'Descendez profondément comme pour vous asseoir, au poids du corps.',
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
      description_pidgin: 'Hold push-up position make your body stay straight like plank board.',
      description_fr: 'Tenez la position de planche, corps bien droit.',
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
      description_pidgin: 'Step one leg forward make you bend knee, dey change legs one by one.',
      description_fr: 'Avancez une jambe en pliant le genou, alternez les jambes.',
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
      description_pidgin: 'Stand up on your toe-toe, then lower your heel down small-small.',
      description_fr: 'Montez sur la pointe des pieds, puis redescendez lentement les talons.',
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
      description_pidgin: 'Dey cross your leg one over another like scissor action.',
      description_fr: 'Croisez les jambes l\'une sur l\'autre comme des ciseaux.',
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
      description_pidgin: 'Dey roll your shoulder round-round forward and backward.',
      description_fr: 'Roulez les épaules en cercles vers l\'avant puis vers l\'arrière.',
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