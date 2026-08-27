// ─── src/context/LanguageContext.tsx ──────────────────────────────────

import React, { createContext, useState, useContext, useEffect } from 'react';
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
    'quiz.q1': 'Which body look like you?',
    'quiz.q1_runner': 'Slim, long, light - like plantain tree',
    'quiz.q1_warrior': 'Solid, broad, strong - like iroko tree',
    'quiz.q1_guardian': 'Steady, soft, balanced - like mango tree',
    'quiz.q2': 'What do you do every day?',
    'quiz.q2_runner': 'I walk a lot, school, market, farm',
    'quiz.q2_warrior': 'I carry heavy things, push, build',
    'quiz.q2_guardian': 'I sit at shop, office, house',
    'quiz.q3': 'After eating fufu, how do you feel?',
    'quiz.q3_runner': 'Hungry again quick (fast burn)',
    'quiz.q3_warrior': 'Strong for long work',
    'quiz.q3_guardian': 'Tired if I eat too much',
    'quiz.q4': 'Do you have any pain or special condition?',
    'quiz.q4_no': 'No, I can do anything',
    'quiz.q4_yes': 'Yes: knee/back pain, big belly, recently gave birth, 50+ years, doctor says no jumping',
    'quiz.q5': 'What do you want?',
    'quiz.q5_runner': 'I want energy to walk, not get tired',
    'quiz.q5_warrior': 'I want muscle, strong arms',
    'quiz.q5_guardian': 'I want balance, to feel good',
    
    // Hub
    'hub.daily_mindset': 'DAILY MINDSET',
    'hub.hello': 'Hello',
    'hub.today_checkin': "TODAY'S CHECK-IN",
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
    'quiz.q1': 'Wich body like you?',
    'quiz.q1_runner': 'Slim, long, light - like plantain tree',
    'quiz.q1_warrior': 'Solid, broad, strong - like iroko tree',
    'quiz.q1_guardian': 'Steady, soft, balanced - like mango tree',
    'quiz.q2': 'Wetin you di do for day?',
    'quiz.q2_runner': 'I waka plenty, school, market, farm',
    'quiz.q2_warrior': 'I carry heavy thing, push, build',
    'quiz.q2_guardian': 'I sit for shop, office, house',
    'quiz.q3': 'After you chop fufu, how you feel?',
    'quiz.q3_runner': 'Hungry again quick (fast burn)',
    'quiz.q3_warrior': 'Strong for long work',
    'quiz.q3_guardian': 'Tired if I chop too much',
    'quiz.q4': 'You get any pain or special condition?',
    'quiz.q4_no': 'No, I fit do anything',
    'quiz.q4_yes': 'Yes: knee/back pain, big belle, born pikin recently, 50+ years, doctor says no jump',
    'quiz.q5': 'Wetin you want?',
    'quiz.q5_runner': 'I want get power for waka, no tired',
    'quiz.q5_warrior': 'I want get muscle, strong hand',
    'quiz.q5_guardian': 'I want balance, feel fine',
    
    // Hub
    'hub.daily_mindset': 'DAILY MINDSET',
    'hub.hello': 'Hello',
    'hub.today_checkin': "TODAY'S CHECK-IN",
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
    'meals.why_good': 'Why This One Good For You',
    'meals.what_you_need': 'What You Need',
    'meals.nutrition_breakdown': 'Nutrition Breakdown',
    'meals.where_to_get': 'Where to get am',
    
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
    'quiz.q1': 'Quel corps vous ressemble?',
    'quiz.q1_runner': 'Mince, long, léger - comme le bananier',
    'quiz.q1_warrior': 'Solide, large, fort - comme l\'iroko',
    'quiz.q1_guardian': 'Stable, doux, équilibré - comme le manguier',
    'quiz.q2': 'Que faites-vous chaque jour?',
    'quiz.q2_runner': 'Je marche beaucoup, école, marché, ferme',
    'quiz.q2_warrior': 'Je porte des choses lourdes, pousse, construis',
    'quiz.q2_guardian': 'Je reste au magasin, au bureau, à la maison',
    'quiz.q3': 'Après avoir mangé du fufu, comment vous sentez-vous?',
    'quiz.q3_runner': 'Affamé à nouveau rapidement (brûlure rapide)',
    'quiz.q3_warrior': 'Fort pour un long travail',
    'quiz.q3_guardian': 'Fatigué si je mange trop',
    'quiz.q4': 'Avez-vous des douleurs ou des conditions particulières?',
    'quiz.q4_no': 'Non, je peux tout faire',
    'quiz.q4_yes': 'Oui: douleurs au genou/dos, gros ventre, accouchement récent, 50+ ans, médecin dit pas de saut',
    'quiz.q5': 'Que voulez-vous?',
    'quiz.q5_runner': 'Je veux de l\'énergie pour marcher, ne pas me fatiguer',
    'quiz.q5_warrior': 'Je veux des muscles, des bras forts',
    'quiz.q5_guardian': 'Je veux l\'équilibre, me sentir bien',
    
    // Hub
    'hub.daily_mindset': 'MENTALITÉ QUOTIDIENNE',
    'hub.hello': 'Bonjour',
    'hub.today_checkin': "VÉRIFICATION DU JOUR",
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

// ─── HELPER FUNCTIONS ──────────────────────────────────────────────────

export const getLanguageLabel = (lang: Language): string => {
  const map: Record<Language, string> = {
    en: 'English',
    pidgin: 'Pidgin',
    fr: 'Français',
  };
  return map[lang] || 'English';
};

export const getLanguageFlag = (lang: Language): string => {
  const map: Record<Language, string> = {
    en: '🇬🇧',
    pidgin: '🇨🇲',
    fr: '🇫🇷',
  };
  return map[lang] || '🇬🇧';
};

// ─── LANGUAGE PROVIDER ─────────────────────────────────────────────────

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language
    AsyncStorage.getItem('mboa-zen-language').then((saved) => {
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
    return translations[language][key] || translations['en'][key] || key;
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