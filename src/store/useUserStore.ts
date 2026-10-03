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
  lastWaterLogDate: string | null;
  setWaterIntake: (amount: number) => void;
  resetWater: () => void;
  logWaterHistory: () => void;
  syncWaterForToday: () => void;

  // ─── Water streak helpers ─────────────────────────────────────────────
  getWaterStreak: () => number;
  getPersonalBest: () => number;
  getDaysSinceLastGoal: () => number;
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
      lastWaterLogDate: null,

      setWaterIntake: (amount) => {
        const { waterGoal, waterHistory } = get();
        const capped = Math.min(Math.max(amount, 0), waterGoal);
        const today = getTodayStr();
        set({
          waterIntake: capped,
          lastWaterLogDate: today,
          waterHistory: {
            ...waterHistory,
            [today]: capped,
          },
        });
      },

      syncWaterForToday: () => {
        const { lastWaterLogDate, waterHistory } = get();
        const today = getTodayStr();

        if (lastWaterLogDate === today) return;

        const todayAmount = waterHistory[today] ?? 0;
        set({
          waterIntake: todayAmount,
          lastWaterLogDate: today,
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

      // ─── WATER STREAK ──────────────────────────────────────────────────
      getWaterStreak: () => {
        const { waterHistory, waterGoal } = get();
        let count = 0;

        for (let i = 0; i < 365; i++) {
          const dateStr = getDateStrOffset(i);
          const glasses = waterHistory[dateStr] ?? 0;

          if (glasses >= waterGoal) {
            count++;
          } else {
            if (i === 0) continue;
            break;
          }
        }

        return count;
      },

      // ─── PERSONAL BEST STREAK ──────────────────────────────────────────
      getPersonalBest: () => {
        const { waterHistory, waterGoal } = get();
        const dates = Object.keys(waterHistory).sort();
        if (dates.length === 0) return 0;

        let best = 0;
        let current = 0;
        let prevDate: Date | null = null;

        for (const dateStr of dates) {
          const glasses = waterHistory[dateStr] ?? 0;
          const thisDate = new Date(dateStr);

          if (glasses >= waterGoal) {
            if (prevDate) {
              const diffDays = Math.round(
                (thisDate.getTime() - prevDate.getTime()) / 86400000
              );
              if (diffDays === 1) {
                current++;
              } else {
                current = 1;
              }
            } else {
              current = 1;
            }
            best = Math.max(best, current);
            prevDate = thisDate;
          } else {
            current = 0;
            prevDate = null;
          }
        }
        return best;
      },

      // ─── DAYS SINCE LAST FULL GOAL ─────────────────────────────────────
 getDaysSinceLastGoal: () => {
  const { waterHistory, waterGoal } = get();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // If today OR yesterday hit the goal, the streak is NOT broken
  if ((waterHistory[todayStr] ?? 0) >= waterGoal) return 0;
  if ((waterHistory[yesterdayStr] ?? 0) >= waterGoal) return 0;

  // Otherwise, count backwards from 2 days ago
  for (let i = 2; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const glasses = waterHistory[dateStr] ?? 0;
    if (glasses >= waterGoal) {
      return i - 1; // days since last full goal day
    }
  }
  return 999;
},
    }),
    {
      name: 'mboa-zen-storage',
      storage: createJSONStorage(() => (isWeb ? webStorage : AsyncStorage)),
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
        lastWaterLogDate: state.lastWaterLogDate,
      }),
    }
  )
);

// DEV ONLY — expose store for debugging
if (typeof window !== 'undefined') {
  (window as any).__store = useUserStore;
}