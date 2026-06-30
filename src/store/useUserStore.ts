import { create } from 'zustand';
import { Archetype } from '../types';

interface UserState {
  userId: string | null;
  userName: string;
  phone: string;
  archetype: Archetype | null;
  selectedGoal: string | null;
  isPremium: boolean;
  harmonyScore: number;
  checkIns: {
    hydration: boolean;
    nutrition: boolean;
    training: boolean;
  };
  setArchetype: (archetype: Archetype) => void;
  setUserName: (name: string) => void;
  setPhone: (phone: string) => void;
  setPremium: (status: boolean) => void;
  setSelectedGoal: (goal: string) => void;
  toggleCheckIn: (key: 'hydration' | 'nutrition' | 'training') => void;
  calculateHarmony: () => void;
  resetCheckIns: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  userId: null,
  userName: '',
  phone: '',
  archetype: null,
  selectedGoal: null,
  isPremium: false,
  harmonyScore: 0,
  checkIns: {
    hydration: false,
    nutrition: false,
    training: false,
  },

  setArchetype: (archetype) => set({ archetype }),
  setUserName: (name) => set({ userName: name }),
  setPhone: (phone) => set({ phone }),
  setPremium: (status) => set({ isPremium: status }),
  setSelectedGoal: (goal) => set({ selectedGoal: goal }),

  toggleCheckIn: (key) => {
    set((state) => {
      const updatedCheckIns = {
        ...state.checkIns,
        [key]: !state.checkIns[key],
      };

      const total = Object.values(updatedCheckIns).length;
      const completed = Object.values(updatedCheckIns).filter(Boolean).length;
      const score = Math.round((completed / total) * 100);

      return {
        checkIns: updatedCheckIns,
        harmonyScore: score,
      };
    });
  },

  calculateHarmony: () => {
    const { checkIns } = get();
    const total = Object.values(checkIns).length;
    const completed = Object.values(checkIns).filter(Boolean).length;
    set({ harmonyScore: Math.round((completed / total) * 100) });
  },

  resetCheckIns: () => {
    set({
      checkIns: { hydration: false, nutrition: false, training: false },
      harmonyScore: 0,
    });
  },
}));