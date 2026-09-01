import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  archetype: string | null;
  phone: string | null;
  isPremium: boolean;
  setArchetype: (archetype: string) => void;
  setPhone: (phone: string) => void;
  setIsPremium: (isPremium: boolean) => void;
  checkIns: {
    hydration: boolean;
    nutrition: boolean;
    training: boolean;
  };
  toggleCheckIn: (key: 'hydration' | 'nutrition' | 'training') => void;
  harmonyScore: number;
  checkInHistory: Record<string, any>;
  logCheckInHistory: () => void;
  lastCheckinDate: string | null;
  setLastCheckinDate: (date: string) => void;
  resetCheckIns: () => void;
  
  // ─── WATER TRACKING ────────────────────────────────────────────────────
  waterIntake: number;
  waterGoal: number;
  waterHistory: Record<string, number>;
  setWaterIntake: (amount: number) => void;
  resetWater: () => void;
  logWaterHistory: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      archetype: null,
      phone: null,
      isPremium: false,
      setArchetype: (archetype) => set({ archetype }),
      setPhone: (phone) => set({ phone }),
      setIsPremium: (isPremium) => set({ isPremium }),
      checkIns: {
        hydration: false,
        nutrition: false,
        training: false,
      },
      toggleCheckIn: (key) =>
        set((state) => ({
          checkIns: {
            ...state.checkIns,
            [key]: !state.checkIns[key],
          },
        })),
      harmonyScore: 0,
      checkInHistory: {},
      logCheckInHistory: () => {
        const { checkIns, checkInHistory } = get();
        const today = new Date().toISOString().split('T')[0];
        const completed = Object.values(checkIns).filter(Boolean).length;
        const score = Math.round((completed / 3) * 100);
        
        set({
          checkInHistory: {
            ...checkInHistory,
            [today]: { ...checkIns, harmonyScore: score },
          },
          harmonyScore: score,
        });
      },
      lastCheckinDate: null,
      setLastCheckinDate: (date) => set({ lastCheckinDate: date }),
      resetCheckIns: () =>
        set({
          checkIns: { hydration: false, nutrition: false, training: false },
        }),
      
      // ─── WATER TRACKING IMPLEMENTATION ────────────────────────────────
      waterIntake: 0,
      waterGoal: 8,
      waterHistory: {},
      
      setWaterIntake: (amount) => {
        const goal = get().waterGoal;
        // Cap at goal
        const capped = Math.min(amount, goal);
        set({ waterIntake: capped });
      },
      
      resetWater: () => {
        const { waterIntake, waterHistory } = get();
        const today = new Date().toISOString().split('T')[0];
        
        set({
          waterIntake: 0,
          waterHistory: {
            ...waterHistory,
            [today]: waterIntake,
          },
        });
      },
      
      logWaterHistory: () => {
        const { waterIntake, waterHistory } = get();
        const today = new Date().toISOString().split('T')[0];
        
        set({
          waterHistory: {
            ...waterHistory,
            [today]: waterIntake,
          },
        });
      },
    }),
    {
      name: 'mboa-zen-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // ─── PERSIST WATER DATA ────────────────────────────────────────────
      partialize: (state) => ({
        archetype: state.archetype,
        phone: state.phone,
        isPremium: state.isPremium,
        checkInHistory: state.checkInHistory,
        harmonyScore: state.harmonyScore,
        lastCheckinDate: state.lastCheckinDate,
        // Water data to persist
        waterIntake: state.waterIntake,
        waterGoal: state.waterGoal,
        waterHistory: state.waterHistory,
      }),
    }
  )
);