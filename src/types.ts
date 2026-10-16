// ─── src/types.ts ──────────────────────────────────────────────────────

// ─── Archetypes ─────────────────────────────────────────────────────────
export type Archetype = 'runner' | 'warrior' | 'guardian';

// ─── Meals ──────────────────────────────────────────────────────────────
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
  region: string;
  type: 'street' | 'home' | 'both';
  image?: string;
  high_res_image?: string;
  foods: MealFoodItem[];
  nutrition: MealNutrition;
  why_good: string;
  why_good_pidgin?: string;
  why_good_fr?: string;
  available_from: string;
  available_from_pidgin?: string;
  available_from_fr?: string;
  verified: boolean;
}

// ─── Proverbs ───────────────────────────────────────────────────────────
export interface Proverb {
  id: number;
  proverb: string;
  proverb_fr?: string;
  proverb_pidgin?: string;
  lesson: string;
  lesson_fr?: string;
  lesson_pidgin?: string;
  origin: string;
}