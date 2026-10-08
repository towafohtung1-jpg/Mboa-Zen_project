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
    quiz: {
      eyebrow: 'DISCOVER YOUR ARCHETYPE',
      questionLabel: 'Question',
      imageHint: 'Plantain - Iroko - Mango',
      safetyNote: 'If you have any health conditions, we will recommend the safest path for you.',
      q1: {
        question: 'Which body type looks like you?',
        a: 'Slim, long, light - like plantain tree',
        b: 'Solid, broad, strong - like iroko tree',
        c: 'Steady, soft, balanced - like mango tree',
      },
      q2: {
        question: 'What do you do every day?',
        a: 'I walk a lot - school, market, farm',
        b: 'I carry heavy things, push, build',
        c: 'I sit at shop, office, or home',
      },
      q3: {
        question: 'After eating fufu, how do you feel?',
        a: 'Hungry again quickly (fast burn)',
        b: 'Strong for long work',
        c: 'Tired if I eat too much',
      },
      q4: {
        question: 'Do you have any pain or special condition?',
        a: 'No, I can do anything',
        b: 'Yes: knee/back pain, big belly, gave birth, 50+, doctor says no jump',
      },
      q5: {
        question: 'What is your goal?',
        a: 'I want power for walking, no tiredness',
        b: 'I want muscle, strong hands',
        c: 'I want balance, to feel fine',
      },
    },  },
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
      loseWeightDesc: 'Move fat and Dry well well',
      buildStrength: 'Build Strength',
      buildStrengthDesc: 'Add muscle and get power',
      stayActive: 'Remain Active',
      stayActiveDesc: 'Keep your body and energy well',
      eatBetter: 'Chop Better',
      eatBetterDesc: 'Make better decision for everyday chop',
      continue: 'Continue',
      skip: 'Skip',
    },
    quiz: {
      eyebrow: 'Find out wetin be your bodytype',
      questionLabel: 'Question',
      imageHint: 'Planty - Iroko - Mango',
      safetyNote: 'If you get any health condition, we go show you the safest way.',
      q1: {
        question: 'Which body type resemble you?',
        a: 'Dry, long, light - like planty tree',
        b: 'Solid, broad, strong - like iroko tree',
        c: 'Steady, soft, balanced - like mango tree',
      },
      q2: {
        question: 'Which kind work you dey do everyday?',
        a: 'I dey waka plenty - school, market, farm',
        b: 'I dey carry heavy load, push, build',
        c: 'I dey sit for shop, office, or house',
      },
      q3: {
        question: 'After you chop fufu, how you dey feel?',
        a: 'Chop di finish for my belle quick quick',
        b: 'I dey get energy for waka for long',
        c: 'Sleep dey do me if I chop plenty',
      },
      q4: {
        question: 'You get any pain or special condition?',
        a: 'No, I fit do anything',
        b: 'Yes: knee/back pain, big belle, born pikin, 50+ doctor say make I no jump',
      },
      q5: {
        question: 'Wetin you want gain for here?',
        a: 'I want power for waka, no tiredness',
        b: 'I want muscle, strong hand',
        c: 'I want balance, to feel fine',
      },
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
    quiz: {      
      eyebrow: 'DÉCOUVREZ VOTRE ARCHÉTYPE',
      questionLabel: 'Question',
      imageHint: 'Bananier - Iroko - Manguier',
      safetyNote: 'Si vous avez des problèmes de santé, nous vous recommanderons le chemin le plus sûr.',
      q1: {
        question: 'Quel type de corps vous ressemble ?',
        a: 'Mince, long, léger - comme le bananier',
        b: 'Solide, large, fort - comme l\'iroko',
        c: 'Stable, doux, équilibré - comme le manguier',
      },
      q2: {
        question: 'Que faites-vous chaque jour ?',
        a: 'Je marche beaucoup - école, marché, ferme',
        b: 'Je porte des charges lourdes, je pousse, je construis',
        c: 'Je reste assis au magasin, au bureau ou à la maison',
      },
      q3: {
        question: 'Après avoir mangé du fufu, comment vous sentez-vous ?',
        a: 'Faim à nouveau rapidement (brûle vite)',
        b: 'Fort pour un long travail',
        c: 'Fatigué si je mange trop',
      },
      q4: {
        question: 'Avez-vous des douleurs ou une condition particulière ?',
        a: 'Non, je peux tout faire',
        b: 'Oui : douleur genou/dos, gros ventre, accouchement récent, 50+, médecin interdit saut',
      },
      q5: {
        question: 'Quel est votre objectif ?',
        a: 'Je veux de l\'énergie pour marcher, sans fatigue',
        b: 'Je veux du muscle, des mains fortes',
        c: 'Je veux l\'équilibre, me sentir bien',
      },
    },
  },
};
