// ─── src/i18n/strings.ts ───────────────────────────────────────────────

export type Language = 'en' | 'pidgin' | 'fr';

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'pidgin', label: 'Pidgin' },
  { code: 'fr', label: 'Français' },
];

export const strings = {
  en: {
    onboarding: {
      title: 'Local Food. Real Strength.',
      subtitle: 'Nutrition plans built around the foods you already know and trust.',
      startButton: 'Start Journey',
    },
    goal: {
      eyebrow: 'YOUR JOURNEY',
      title: 'What is your main health goal?',
      subtitle: 'Choose one main focus. You can always adjust later.',
      loseWeight: 'Lose Weight',
      loseWeightDesc: 'Burn fat and slim down healthily',
      buildStrength: 'Build Strength',
      buildStrengthDesc: 'Gain muscle and get stronger',
      stayActive: 'Stay Active',
      stayActiveDesc: 'Maintain good health and energy',
      eatBetter: 'Eat Better',
      eatBetterDesc: 'Make smarter everyday food choices',
      continue: 'Continue',
      skip: 'Skip',
    },
  },
  pidgin: {
    onboarding: {
      title: 'Local Chop. Real Power.',
      subtitle: 'Food plan wey dey use chop you sabi well well.',
      startButton: 'Start Journey',
    },
    goal: {
      eyebrow: 'YOUR JOURNEY',
      title: 'Waity you want do for your health?',
      subtitle: 'Choose one from list. You fit change am later.',
      loseWeight: 'Lose Weight',
      loseWeightDesc: 'Move fat and try well well',
      buildStrength: 'Build Strength',
      buildStrengthDesc: 'Add muscle and get power',
      stayActive: 'Remain Active',
      stayActiveDesc: 'Keep your body and energy well',
      eatBetter: 'Chop Better',
      eatBetterDesc: 'Make better decision for everyday chop',
      continue: 'Continue',
      skip: 'Skip',
    },
  },
    fr: {
    onboarding: {
      title: 'Nourriture Locale. Vraie Force.',
      subtitle: 'Des plans nutritionnels basés sur les aliments que vous connaissez et en qui vous avez confiance.',
      startButton: 'Commencer',
    },
    goal: {
      eyebrow: 'VOTRE PARCOURS',
      title: 'Quel est votre objectif principal de santé ?',
      subtitle: 'Choisissez un objectif principal. Vous pouvez toujours ajuster plus tard.',
      loseWeight: 'Perdre du Poids',
      loseWeightDesc: 'Brûler les graisses et mincir sainement',
      buildStrength: 'Gagner en Force',
      buildStrengthDesc: 'Gagner du muscle et devenir plus fort',
      stayActive: 'Restez Actif',
      stayActiveDesc: "Maintenir une bonne santé et de l'énergie",
      eatBetter: 'Mieux Manger',
      eatBetterDesc: 'Faire de meilleurs choix alimentaires au quotidien',
      continue: 'Continuer',
      skip: 'Passer',
    },
  },
};
