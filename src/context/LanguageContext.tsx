// ─── src/context/LanguageContext.tsx ──────────────────────────────────

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'pidgin' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ─── TRANSLATIONS ──────────────────────────────────────────────────────

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.name': 'Mboa-Zen',
    'app.tagline': 'Local Wellness. Modern Discipline.',
    
    // Onboarding
    'onboarding.title': 'Local Food. Real Strength.',
    'onboarding.subtitle': 'Nutrition plans built around the foods you already know and trust.',
    'onboarding.continue': 'Continue',
    
    // Goals
    'goals.title': 'What is your main health goal?',
    'goals.lose_weight': 'Lose Weight',
    'goals.lose_weight_desc': 'Burn fat and slim down healthily',
    'goals.build_strength': 'Build Strength',
    'goals.build_strength_desc': 'Gain muscle and get stronger',
    'goals.stay_active': 'Stay Active',
    'goals.stay_active_desc': 'Maintain good health and energy',
    'goals.eat_better': 'Eat Better',
    'goals.eat_better_desc': 'Make smarter everyday food choices',
    
    // Archetypes
    'archetype.runner': 'Runner',
    'archetype.runner_title': 'The Swift',
    'archetype.warrior': 'Warrior',
    'archetype.warrior_title': 'The Strong',
    'archetype.guardian': 'Guardian',
    'archetype.guardian_title': 'The Steady',
    
    // Quiz
    'quiz.q1': 'How would you describe your body frame?',
    'quiz.q1_runner': 'Thin and lean',
    'quiz.q1_warrior': 'Medium and athletic',
    'quiz.q1_guardian': 'Broad and solid',
    'quiz.q2': 'When you eat a large meal, what happens?',
    'quiz.q2_runner': 'I stay the same weight',
    'quiz.q2_warrior': 'I feel energized',
    'quiz.q2_guardian': 'I feel heavy',
    'quiz.q3': 'What type of activity feels most natural?',
    'quiz.q3_runner': 'Long walks and running',
    'quiz.q3_warrior': 'Lifting and pushing',
    'quiz.q3_guardian': 'Gentle movement',
    'quiz.q4': 'How does your body respond to exercise?',
    'quiz.q4_runner': 'I get lean but not muscular',
    'quiz.q4_warrior': 'I see results quickly',
    'quiz.q4_guardian': 'I need long effort for changes',
    'quiz.q5': 'What is your main fitness priority?',
    'quiz.q5_runner': 'Stamina and endurance',
    'quiz.q5_warrior': 'Power and strength',
    'quiz.q5_guardian': 'Balance and recovery',
    
    // Hub
    'hub.daily_mindset': 'Daily Mindset',
    'hub.hello': 'Hello',
    'hub.today_checkin': "Today's Check-in",
    'hub.hydration': 'Have you drunk at least 3 cups of water today?',
    'hub.nutrition': 'Have you eaten a balanced local meal today?',
    'hub.training': 'Have you moved or exercised today?',
    'hub.yes': 'Yes',
    'hub.not_yet': 'Not Yet',
    'hub.water_tracker': 'Water Tracker',
    'hub.drops': 'drops',
    
    // Meals
    'meals.your_meals': 'Your Meals',
    'meals.breakfast': 'Breakfast',
    'meals.lunch': 'Lunch',
    'meals.supper': 'Supper',
    'meals.today_calories': "Today's Calories",
    'meals.choose': 'Choose any meal below. All options suit your body profile.',
    'meals.option': 'Option',
    'meals.i_ate_this': '✓ I Ate This',
    'meals.why_good': 'Why This Is Good For You',
    'meals.what_you_need': 'What You Need',
    'meals.nutrition_breakdown': 'Nutritional Breakdown',
    'meals.where_to_get': 'Where to get it',
    
    // Dojo
    'dojo.the_dojo': 'The Dojo',
    'dojo.exercises': 'Exercises',
    'dojo.up_next': 'Up Next',
    'dojo.complete': 'Complete',
    'dojo.play': 'Play',
    'dojo.pause': 'Pause',
    'dojo.prev': 'Prev',
    'dojo.next': 'Next',
    'dojo.duration': 'Duration',
    'dojo.difficulty': 'Difficulty',
    'dojo.beginners': 'Beginner',
    'dojo.intermediate': 'Intermediate',
    'dojo.advanced': 'Advanced',
    
    // Market
    'market.the_market': 'The Market',
    'market.premium': 'Premium',
    'market.upgrade': 'Upgrade Now',
    'market.price': 'FCFA 2,500 / month',
    'market.momo': 'Pay with MTN MoMo',
    'market.orange': 'Pay with Orange Money',
    'market.coaches': 'Available Coaches',
    'market.book_coach': 'Book a Coach',
    'market.njangi': 'Njangi Box',
    'market.save': 'Save',
    'market.goal': 'Goal',
    
    // Common buttons
    'common.continue': 'Continue',
    'common.skip': 'Skip',
    'common.back': 'Back',
    'common.done': 'Done',
    'common.cancel': 'Cancel',
    'common.ok': 'OK',
    'common.error': 'Error',
    'common.loading': 'Loading...',
    'common.close': 'Close',
  },
  pidgin: {
    // Common
    'app.name': 'Mboa-Zen',
    'app.tagline': 'Local Wellness. Modern Discipline.',
    
    // Onboarding
    'onboarding.title': 'Local Food. Real Strength.',
    'onboarding.subtitle': 'Nutrition plans built around the foods you already know and trust.',
    'onboarding.continue': 'Continue',
    
    // Goals
    'goals.title': 'Wetin be your main health goal?',
    'goals.lose_weight': 'Lose Weight',
    'goals.lose_weight_desc': 'Burn fat and slim down healthily',
    'goals.build_strength': 'Build Strength',
    'goals.build_strength_desc': 'Gain muscle and get stronger',
    'goals.stay_active': 'Stay Active',
    'goals.stay_active_desc': 'Maintain good health and energy',
    'goals.eat_better': 'Eat Better',
    'goals.eat_better_desc': 'Make smarter everyday food choices',
    
    // Archetypes
    'archetype.runner': 'Runner',
    'archetype.runner_title': 'The Swift',
    'archetype.warrior': 'Warrior',
    'archetype.warrior_title': 'The Strong',
    'archetype.guardian': 'Guardian',
    'archetype.guardian_title': 'The Steady',
    
    // Quiz
    'quiz.q1': 'How you go describe your body?',
    'quiz.q1_runner': 'Thin and lean',
    'quiz.q1_warrior': 'Medium and athletic',
    'quiz.q1_guardian': 'Broad and solid',
    'quiz.q2': 'When you chop plenty food, wetin go happen?',
    'quiz.q2_runner': 'I stay the same weight',
    'quiz.q2_warrior': 'I feel energized',
    'quiz.q2_guardian': 'I feel heavy',
    'quiz.q3': 'Which kind activity feel natural for you?',
    'quiz.q3_runner': 'Long walks and running',
    'quiz.q3_warrior': 'Lifting and pushing',
    'quiz.q3_guardian': 'Gentle movement',
    'quiz.q4': 'How your body take respond to exercise?',
    'quiz.q4_runner': 'I get lean but no muscular',
    'quiz.q4_warrior': 'I see results quick',
    'quiz.q4_guardian': 'I need long effort for changes',
    'quiz.q5': 'Wetin be your main fitness goal?',
    'quiz.q5_runner': 'Stamina and endurance',
    'quiz.q5_warrior': 'Power and strength',
    'quiz.q5_guardian': 'Balance and recovery',
    
    // Hub
    'hub.daily_mindset': 'Daily Mindset',
    'hub.hello': 'Hello',
    'hub.today_checkin': "Today's Check-in",
    'hub.hydration': 'You don drink water at least 3 cups today?',
    'hub.nutrition': 'You don chop balanced local food today?',
    'hub.training': 'You don move or exercise today?',
    'hub.yes': 'Yes',
    'hub.not_yet': 'Not Yet',
    'hub.water_tracker': 'Water Tracker',
    'hub.drops': 'drops',
    
    // Meals
    'meals.your_meals': 'Your Meals',
    'meals.breakfast': 'Breakfast',
    'meals.lunch': 'Lunch',
    'meals.supper': 'Supper',
    'meals.today_calories': "Today's Calories",
    'meals.choose': 'Choose any meal below. All options suit your body profile.',
    'meals.option': 'Option',
    'meals.i_ate_this': '✓ I don chop this',
    'meals.why_good': 'Why This Is Good For You',
    'meals.what_you_need': 'What You Need',
    'meals.nutrition_breakdown': 'Nutritional Breakdown',
    'meals.where_to_get': 'Where to get it',
    
    // Dojo
    'dojo.the_dojo': 'The Dojo',
    'dojo.exercises': 'Exercises',
    'dojo.up_next': 'Up Next',
    'dojo.complete': 'Complete',
    'dojo.play': 'Play',
    'dojo.pause': 'Pause',
    'dojo.prev': 'Prev',
    'dojo.next': 'Next',
    'dojo.duration': 'Duration',
    'dojo.difficulty': 'Difficulty',
    'dojo.beginners': 'Beginner',
    'dojo.intermediate': 'Intermediate',
    'dojo.advanced': 'Advanced',
    
    // Market
    'market.the_market': 'The Market',
    'market.premium': 'Premium',
    'market.upgrade': 'Upgrade Now',
    'market.price': 'FCFA 2,500 / month',
    'market.momo': 'Pay with MTN MoMo',
    'market.orange': 'Pay with Orange Money',
    'market.coaches': 'Available Coaches',
    'market.book_coach': 'Book a Coach',
    'market.njangi': 'Njangi Box',
    'market.save': 'Save',
    'market.goal': 'Goal',
    
    // Common buttons
    'common.continue': 'Continue',
    'common.skip': 'Skip',
    'common.back': 'Back',
    'common.done': 'Done',
    'common.cancel': 'Cancel',
    'common.ok': 'OK',
    'common.error': 'Error',
    'common.loading': 'Loading...',
    'common.close': 'Close',
  },
  fr: {
    // Common
    'app.name': 'Mboa-Zen',
    'app.tagline': 'Bien-être Local. Discipline Moderne.',
    
    // Onboarding
    'onboarding.title': 'Alimentation Locale. Vraie Force.',
    'onboarding.subtitle': 'Des plans nutritionnels construits autour des aliments que vous connaissez et appréciez déjà.',
    'onboarding.continue': 'Continuer',
    
    // Goals
    'goals.title': 'Quel est votre principal objectif de santé?',
    'goals.lose_weight': 'Perdre du poids',
    'goals.lose_weight_desc': 'Brûler les graisses et mincir sainement',
    'goals.build_strength': 'Développer la force',
    'goals.build_strength_desc': 'Gagner du muscle et devenir plus fort',
    'goals.stay_active': 'Rester actif',
    'goals.stay_active_desc': 'Maintenir une bonne santé et de l\'énergie',
    'goals.eat_better': 'Manger mieux',
    'goals.eat_better_desc': 'Faire de meilleurs choix alimentaires au quotidien',
    
    // Archetypes
    'archetype.runner': 'Runner',
    'archetype.runner_title': 'Le Rapide',
    'archetype.warrior': 'Guerrier',
    'archetype.warrior_title': 'Le Fort',
    'archetype.guardian': 'Gardien',
    'archetype.guardian_title': 'Le Stable',
    
    // Quiz
    'quiz.q1': 'Comment décririez-vous votre silhouette?',
    'quiz.q1_runner': 'Mince et élancé',
    'quiz.q1_warrior': 'Moyen et athlétique',
    'quiz.q1_guardian': 'Large et solide',
    'quiz.q2': 'Quand vous mangez un grand repas, que se passe-t-il?',
    'quiz.q2_runner': 'Je reste le même poids',
    'quiz.q2_warrior': 'Je me sens plein d\'énergie',
    'quiz.q2_guardian': 'Je me sens lourd',
    'quiz.q3': 'Quel type d\'activité vous semble le plus naturel?',
    'quiz.q3_runner': 'Longues marches et course',
    'quiz.q3_warrior': 'Soulever et pousser',
    'quiz.q3_guardian': 'Mouvements doux',
    'quiz.q4': 'Comment votre corps réagit-il à l\'exercice?',
    'quiz.q4_runner': 'Je deviens mince mais pas musclé',
    'quiz.q4_warrior': 'Je vois des résultats rapidement',
    'quiz.q4_guardian': 'J\'ai besoin d\'efforts prolongés pour des changements',
    'quiz.q5': 'Quelle est votre priorité en matière de fitness?',
    'quiz.q5_runner': 'Endurance et résistance',
    'quiz.q5_warrior': 'Puissance et force',
    'quiz.q5_guardian': 'Équilibre et récupération',
    
    // Hub
    'hub.daily_mindset': 'Mentalité Quotidienne',
    'hub.hello': 'Bonjour',
    'hub.today_checkin': "Vérification du jour",
    'hub.hydration': 'Avez-vous bu au moins 3 verres d\'eau aujourd\'hui?',
    'hub.nutrition': 'Avez-vous mangé un repas local équilibré aujourd\'hui?',
    'hub.training': 'Avez-vous bougé ou fait de l\'exercice aujourd\'hui?',
    'hub.yes': 'Oui',
    'hub.not_yet': 'Pas encore',
    'hub.water_tracker': 'Suivi d\'eau',
    'hub.drops': 'gouttes',
    
    // Meals
    'meals.your_meals': 'Vos Repas',
    'meals.breakfast': 'Petit-déjeuner',
    'meals.lunch': 'Déjeuner',
    'meals.supper': 'Dîner',
    'meals.today_calories': "Calories du jour",
    'meals.choose': 'Choisissez un repas ci-dessous. Toutes les options conviennent à votre profil corporel.',
    'meals.option': 'Option',
    'meals.i_ate_this': '✓ J\'ai mangé ceci',
    'meals.why_good': 'Pourquoi c\'est bon pour vous',
    'meals.what_you_need': 'Ce dont vous avez besoin',
    'meals.nutrition_breakdown': 'Répartition nutritionnelle',
    'meals.where_to_get': 'Où se procurer',
    
    // Dojo
    'dojo.the_dojo': 'Le Dojo',
    'dojo.exercises': 'Exercices',
    'dojo.up_next': 'Prochain',
    'dojo.complete': 'Terminer',
    'dojo.play': 'Lire',
    'dojo.pause': 'Pause',
    'dojo.prev': 'Précédent',
    'dojo.next': 'Suivant',
    'dojo.duration': 'Durée',
    'dojo.difficulty': 'Difficulté',
    'dojo.beginners': 'Débutant',
    'dojo.intermediate': 'Intermédiaire',
    'dojo.advanced': 'Avancé',
    
    // Market
    'market.the_market': 'Le Marché',
    'market.premium': 'Premium',
    'market.upgrade': 'Mettre à niveau',
    'market.price': 'FCFA 2,500 / mois',
    'market.momo': 'Payer avec MTN MoMo',
    'market.orange': 'Payer avec Orange Money',
    'market.coaches': 'Entraîneurs disponibles',
    'market.book_coach': 'Réserver un entraîneur',
    'market.njangi': 'Njangi Box',
    'market.save': 'Économiser',
    'market.goal': 'Objectif',
    
    // Common buttons
    'common.continue': 'Continuer',
    'common.skip': 'Sauter',
    'common.back': 'Retour',
    'common.done': 'Terminé',
    'common.cancel': 'Annuler',
    'common.ok': 'OK',
    'common.error': 'Erreur',
    'common.loading': 'Chargement...',
    'common.close': 'Fermer',
  },
};

// ─── LANGUAGE PROVIDER ──────────────────────────────────────────────────

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language
    AsyncStorage.getItem('mboa-zen-language').then((saved: string | null) => {
      if (saved === 'pidgin' || saved === 'fr' || saved === 'en') {
        setLanguage(saved as Language);
      }
    });
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    AsyncStorage.setItem('mboa-zen-language', lang);
  };

  const t = (key: string): string => {
    const lang = language as keyof typeof translations;
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};