import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Archetype } from '../types';

type DailyCheckIn = {
  hydration: boolean;
  nutrition: boolean;
  training: boolean;
};

interface UserState {
  // Profile
  userId: string | null;
  userName: string;
  phone: string;
  archetype: Archetype | null;
  selectedGoal: string | null;
  isPremium: boolean;

  // Daily tracking
  harmonyScore: number;
  checkIns: DailyCheckIn;

  // History
  checkInHistory: Record<string, DailyCheckIn>;
  lastCheckinDate: string | null;

  // Actions
  setArchetype: (archetype: Archetype) => void;
  setUserName: (name: string) => void;
  setPhone: (phone: string) => void;
  setPremium: (status: boolean) => void;
  setSelectedGoal: (goal: string) => void;
  toggleCheckIn: (key: 'hydration' | 'nutrition' | 'training') => void;
  calculateHarmony: () => void;
  resetCheckIns: () => void;
  logCheckInHistory: () => void;
  setLastCheckinDate: (date: string) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
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
      checkInHistory: {},
      lastCheckinDate: null,

      // Setters
      setArchetype: (archetype) => set({ archetype }),
      setUserName: (name) => set({ userName: name }),
      setPhone: (phone) => set({ phone }),
      setPremium: (status) => set({ isPremium: status }),
      setSelectedGoal: (goal) => set({ selectedGoal: goal }),
      setLastCheckinDate: (date) => set({ lastCheckinDate: date }),

      // Toggle check-in and recalculate harmony atomically
      toggleCheckIn: (key) => {
        set((state) => {
          const updatedCheckIns = {
            ...state.checkIns,
            [key]: !state.checkIns[key],
          };
          const total = Object.values(updatedCheckIns).length;
          const completed = Object.values(updatedCheckIns).filter(Boolean).length;
          const score = Math.round((completed / total) * 100);
          return { checkIns: updatedCheckIns, harmonyScore: score };
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

      // Save today's check-ins to history keyed by date
      logCheckInHistory: () => {
        const { checkIns, checkInHistory } = get();
        const today = new Date().toISOString().split('T')[0];
        set({
          checkInHistory: {
            ...checkInHistory,
            [today]: { ...checkIns },
          },
        });
      },

      // Full reset
      resetUser: () => {
        set({
          userId: null,
          userName: '',
          phone: '',
          archetype: null,
          selectedGoal: null,
          isPremium: false,
          harmonyScore: 0,
          checkIns: { hydration: false, nutrition: false, training: false },
          checkInHistory: {},
          lastCheckinDate: null,
        });
      },
    }),
    {
      name: 'mboa-zen-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);