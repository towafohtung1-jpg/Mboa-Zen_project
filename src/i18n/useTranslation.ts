// ─── src/i18n/useTranslation.ts ────────────────────────────────────────

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { strings, Language } from './strings';

const isWeb = typeof window !== 'undefined';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'mboa-zen-language',
      storage: createJSONStorage(() => (isWeb ? localStorage : AsyncStorage)),
    }
  )
);

export const useTranslation = () => {
  const language = useLanguageStore((state) => state.language);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = strings[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t, language };
};
