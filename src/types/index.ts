export type Archetype = 'runner' | 'warrior' | 'guardian' | null;
export type ArchetypeLabel = 'The Runner' | 'The Warrior' | 'The Guardian';
export type MealTime = 'breakfast' | 'lunch' | 'supper';

export interface Proverb {
  id: number;
  proverb: string;
  origin: string;
  lesson: string;
}

export interface RecipeMacros {
  carbohydrates: string;
  protein: string;
  lipids: string;
}

export interface Recipe {
  id: number;
  archetype: ArchetypeLabel;
  meal_time: MealTime;
  meal_name: string;
  image: string;
  profile_focus: string;
  market_staples_required: string[];
  macronutrients: RecipeMacros;
  ingredients: string[];
  cooking_steps: string[];
}

export interface WorkoutDuration {
  default_active_seconds: number;
  default_rest_seconds: number;
  recommended_reps: number;
}

export interface WorkoutExercise {
  id: number;
  figma_system_label: string;
  target_muscle_group: string;
  cultural_lineage_roots: string;
  archetypes: string[];
  image: string;
  duration_parameters: WorkoutDuration;
  movement_mechanics: string[];
  audio_coaching_cues: string[];
}