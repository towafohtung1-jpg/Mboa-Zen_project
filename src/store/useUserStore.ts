import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = typeof window !== 'undefined';

// Web storage adapter
const webStorage = {
  getItem: (key: string) => {
    try {
      const value = isWeb ? localStorage.getItem(key) : null;
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: any) => {
    try {
      if (isWeb) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {}
  },
  removeItem: (key: string) => {
    try {
      if (isWeb) {
        localStorage.removeItem(key);
      }
    } catch {}
  },
};

// ─── HELPER: Get today's date as YYYY-MM-DD ────────────────────────────
const getTodayStr = () => new Date().toISOString().split('T')[0];

// ─── HELPER: Get a date string N days ago ──────────────────────────────
const getDateStrOffset = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().split('T')[0];
};

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

  // Water tracking
  waterIntake: number;
  waterGoal: number;
  waterHistory: Record<string, number>;
  setWaterIntake: (amount: number) => void;
  resetWater: () => void;
  logWaterHistory: () => void;

  // ─── NEW: Water streak helper ────────────────────────────────────────
  getWaterStreak: () => number;
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
        const today = getTodayStr();
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

      waterIntake: 0,
      waterGoal: 8,
      waterHistory: {},

      // ─── UPDATED: Auto-saves water history on every change ────────────
      setWaterIntake: (amount) => {
        const { waterGoal, waterHistory } = get();
        const capped = Math.min(Math.max(amount, 0), waterGoal);
        const today = getTodayStr();
        set({
          waterIntake: capped,
          waterHistory: {
            ...waterHistory,
            [today]: capped,
          },
        });
      },

      resetWater: () => {
        const { waterIntake, waterHistory } = get();
        const today = getTodayStr();
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
        const today = getTodayStr();
        set({
          waterHistory: {
            ...waterHistory,
            [today]: waterIntake,
          },
        });
      },

      // ─── NEW: Compute water streak ────────────────────────────────────
      // A "streak day" = waterHistory[date] === waterGoal (8/8)
      // Streak counts backwards from today until a missed day.
      getWaterStreak: () => {
        const { waterHistory, waterGoal } = get();
        let count = 0;

        // Start from today, walk backwards
        for (let i = 0; i < 365; i++) {
          const dateStr = getDateStrOffset(i);
          const glasses = waterHistory[dateStr] ?? 0;

          if (glasses >= waterGoal) {
            count++;
          } else {
            // If today is incomplete, allow the streak to start yesterday
            // (so an in-progress day doesn't show 0)
            if (i === 0) continue;
            break;
          }
        }

        return count;
      },
    }),
    {
      name: 'mboa-zen-storage',
      storage: createJSONStorage(() => isWeb ? webStorage : AsyncStorage),
      partialize: (state) => ({
        archetype: state.archetype,
        phone: state.phone,
        isPremium: state.isPremium,
        checkInHistory: state.checkInHistory,
        harmonyScore: state.harmonyScore,
        lastCheckinDate: state.lastCheckinDate,
        waterIntake: state.waterIntake,
        waterGoal: state.waterGoal,
        waterHistory: state.waterHistory,
      }),
    }
  )
);