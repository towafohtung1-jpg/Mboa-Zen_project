export type Archetype = 'runner' | 'warrior' | 'guardian' | null;
export type ArchetypeLabel = 'The Runner' | 'The Warrior' | 'The Guardian';

// ─── MEAL TYPES ─────────────────────────────────────────────────────────

export interface MealFoodItem {
  name: string;
  quantity: string;
  notes?: string;
}

export interface MealNutrition {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
}

export interface MealOption {
  id: string;
  meal_name: string;
  option_number: number;
  meal_time: 'breakfast' | 'lunch' | 'supper';
  region: string;                    // NEW
  type: 'street' | 'home' | 'both';  // NEW
  image?: string;
  high_res_image?: string;           // NEW
  foods: MealFoodItem[];
  nutrition: MealNutrition;
  why_good: string;
  available_from: string;
  verified: boolean;                 // NEW
}


// ─── WORKOUT TYPES ──────────────────────────────────────────────────────

export interface Exercise {
  id: string;
  name: string;
  description: string;
  image: string;
  video?: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  archetype: Archetype[];
}

export interface WorkoutSession {
  id: string;
  archetype: Archetype;
  exercises: Exercise[];
  completed: boolean;
  date: string;
  duration: number;
}

// ─── USER TYPES ─────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  archetype: Archetype;
  createdAt: string;
  updatedAt: string;
}

// ─── PROVERB TYPES ──────────────────────────────────────────────────────

export interface Proverb {
  id: number;
  proverb: string;
  origin: string;
  lesson: string;
}