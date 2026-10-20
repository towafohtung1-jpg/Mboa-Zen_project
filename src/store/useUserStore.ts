// ─── src/store/useUserStore.ts ──────────────────────────────────────────
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';

const isWeb = typeof window !== 'undefined';

// ─── WEB STORAGE ADAPTER ────────────────────────────────────────────────
// IMPORTANT: Zustand's createJSONStorage expects getItem to return the raw
// serialized string (or null). It also passes already-serialized strings
// to setItem. Do NOT JSON.parse / JSON.stringify here.
const webStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return isWeb ? localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (isWeb) localStorage.setItem(key, value);
    } catch {}
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      if (isWeb) localStorage.removeItem(key);
    } catch {}
  },
};

// ─── DATE HELPERS ───────────────────────────────────────────────────────
const getTodayStr = () => new Date().toISOString().split('T')[0];

const getDateStrOffset = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().split('T')[0];
};

// ─── TYPES ──────────────────────────────────────────────────────────────
type CheckInKey = 'hydration' | 'nutrition' | 'training';
type NjangiItem = 'water' | 'food' | 'move';

interface AnalyticsEvent {
  event: string;
  props: Record<string, any>;
  ts: number;
}
// ─── SUPABASE SYNC HELPER ───────────────────────────────────────────────
// We use a dummy phone number for now since we haven't wired the real auth yet.
const DEV_PHONE_NUMBER = '+237600000000';

const syncToCloud = async (state: any) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        archetype: state.archetype,
        is_premium: state.isPremium,
        water_intake: state.waterIntake,
        water_goal: state.waterGoal,
        harmony_score: state.harmonyScore,
      })
      .eq('phone', DEV_PHONE_NUMBER);

    if (error) {
      console.warn('Supabase sync error:', error.message);
    } else {
      console.log('☁️ Synced to cloud');
    }
  } catch (err) {
    console.warn('Supabase sync failed:', err);
  }
};

interface UserState {
  archetype: string | null;
  phone: string | null;
  isPremium: boolean;
  setArchetype: (archetype: string) => void;
  setPhone: (phone: string | null) => void;
  setIsPremium: (isPremium: boolean) => void;

  checkIns: {
    hydration: boolean;
    nutrition: boolean;
    training: boolean;
  };
  toggleCheckIn: (key: CheckInKey) => void;
  harmonyScore: number;
  checkInHistory: Record<string, any>;
  logCheckInHistory: () => void;
  lastCheckinDate: string | null;
  setLastCheckinDate: (date: string) => void;
  resetCheckIns: () => void;
  /** Restore today's checkIns from persisted history. Call on app mount. */
  rehydrateCheckInsForToday: () => void;

  // Water tracking
  waterIntake: number;
  waterGoal: number;
  waterHistory: Record<string, number>;
  lastWaterLogDate: string | null;
  setWaterIntake: (amount: number) => void;
  resetWater: () => void;
  logWaterHistory: () => void;
  syncWaterForToday: () => void;

  // Water streak helpers
  getWaterStreak: () => number;
  getPersonalBest: () => number;
  getDaysSinceLastGoal: () => number;
  getDaysActive: () => number;

  // Milestones
  celebratedMilestones: string[];
  markMilestoneCelebrated: (key: string) => void;

  // Njangi
  njangiHistory: Record<string, NjangiItem[]>;
  njangiSavings: number;
  addNjangiItem: (item: NjangiItem) => void;
  saveNjangiMoney: (amount: number) => void;
  getNjangiStreak: () => number;
  getTodayNjangi: () => NjangiItem[];

  // Steps
  todaySteps: number;
  stepsHistory: Record<string, number>;
  stepGoal: number;
  setTodaySteps: (steps: number) => void;
  getStepStreak: () => number;
  getStepPersonalBest: () => number;

  // Analytics
  analyticsEvents: AnalyticsEvent[];
  recordEvent: (event: string, props?: Record<string, any>) => void;
  getAnalyticsSummary: () => {
    totalEvents: number;
    uniqueDays: number;
    firstEventDate: string | null;
    eventCounts: Record<string, number>;
  };
  clearAnalytics: () => void;
}

// ─── STORE ──────────────────────────────────────────────────────────────
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // ─── Identity ────────────────────────────────────────────────────
      archetype: null,
      phone: null,
      isPremium: false,
      setArchetype: (archetype) => set({ archetype }),
      setPhone: (phone) => set({ phone }),
      setIsPremium: (isPremium) => set({ isPremium }),

      // ─── Check-ins ───────────────────────────────────────────────────
      checkIns: { hydration: false, nutrition: false, training: false },

      toggleCheckIn: (key) =>
        set((state) => ({
          checkIns: { ...state.checkIns, [key]: !state.checkIns[key] },
        })),

      harmonyScore: 0,
      checkInHistory: {},

      logCheckInHistory: () => {
        const { checkIns, checkInHistory } = get();
        const today = getTodayStr();
        const completed = Object.values(checkIns).filter(Boolean).length;
        const score = Math.round((completed / 3) * 100);

        const existing = checkInHistory[today];
        // Guard: don't overwrite a real log with an all-false log.
        if (
          existing &&
          typeof existing === 'object' &&
          (existing.harmonyScore ?? 0) > score
        ) {
          return;
        }

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
        set({ checkIns: { hydration: false, nutrition: false, training: false } }),

      rehydrateCheckInsForToday: () => {
        const { checkInHistory } = get();
        const today = getTodayStr();
        const log = checkInHistory[today];
        if (log && typeof log === 'object') {
          set({
            checkIns: {
              hydration: !!log.hydration,
              nutrition: !!log.nutrition,
              training: !!log.training,
            },
            harmonyScore: typeof log.harmonyScore === 'number' ? log.harmonyScore : 0,
          });
        }
      },

      // ─── Water ───────────────────────────────────────────────────────
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
        // 🔥 Sync to cloud in the background
        syncToCloud(get());
      },

      syncWaterForToday: () => {
        const { lastWaterLogDate, waterHistory } = get();
        const today = getTodayStr();
        if (lastWaterLogDate === today) return;
        const todayAmount = waterHistory[today] ?? 0;
        set({ waterIntake: todayAmount, lastWaterLogDate: today });
      },

      resetWater: () => {
        const { waterIntake, waterHistory } = get();
        const today = getTodayStr();
        set({
          waterIntake: 0,
          waterHistory: { ...waterHistory, [today]: waterIntake },
        });
      },

      logWaterHistory: () => {
        const { waterIntake, waterHistory } = get();
        const today = getTodayStr();
        set({ waterHistory: { ...waterHistory, [today]: waterIntake } });
      },

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
              current = diffDays === 1 ? current + 1 : 1;
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

      getDaysSinceLastGoal: () => {
        const { waterHistory, waterGoal } = get();
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if ((waterHistory[todayStr] ?? 0) >= waterGoal) return 0;
        if ((waterHistory[yesterdayStr] ?? 0) >= waterGoal) return 0;

        for (let i = 2; i <= 30; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          if ((waterHistory[dateStr] ?? 0) >= waterGoal) return i - 1;
        }
        return 999;
      },

      getDaysActive: () => {
        const { checkInHistory, waterHistory } = get();
        const activeDates = new Set<string>();

        Object.entries(checkInHistory).forEach(([date, log]: [string, any]) => {
          if (log && typeof log === 'object') {
            if (log.hydration || log.nutrition || log.training) {
              activeDates.add(date);
            }
          }
        });

        Object.entries(waterHistory).forEach(([date, glasses]) => {
          if (typeof glasses === 'number' && glasses > 0) {
            activeDates.add(date);
          }
        });

        return activeDates.size;
      },

      // ─── Milestones ──────────────────────────────────────────────────
      celebratedMilestones: [],
      markMilestoneCelebrated: (key) => {
        const { celebratedMilestones } = get();
        if (celebratedMilestones.includes(key)) return;
        set({ celebratedMilestones: [...celebratedMilestones, key] });
      },

      // ─── Njangi ──────────────────────────────────────────────────────
      njangiHistory: {},
      njangiSavings: 0,

      addNjangiItem: (item) => {
        const { njangiHistory } = get();
        const today = getTodayStr();
        const todayItems = njangiHistory[today] ?? [];
        if (todayItems.includes(item)) return;
        set({
          njangiHistory: { ...njangiHistory, [today]: [...todayItems, item] },
        });
      },

      saveNjangiMoney: (amount) => {
        const { njangiSavings } = get();
        set({ njangiSavings: njangiSavings + amount });
      },

      getTodayNjangi: () => {
        const { njangiHistory } = get();
        const today = getTodayStr();
        return njangiHistory[today] ?? [];
      },

      getNjangiStreak: () => {
        const { njangiHistory } = get();
        let count = 0;
        for (let i = 0; i < 365; i++) {
          const dateStr = getDateStrOffset(i);
          const items = njangiHistory[dateStr] ?? [];
          if (items.length >= 2) {
            count++;
          } else {
            if (i === 0) continue;
            break;
          }
        }
        return count;
      },

      // ─── Steps ───────────────────────────────────────────────────────
      todaySteps: 0,
      stepsHistory: {},
      stepGoal: 10000,

      setTodaySteps: (steps) => {
        const { stepsHistory } = get();
        const today = getTodayStr();
        const capped = Math.max(0, Math.floor(steps));
        set({
          todaySteps: capped,
          stepsHistory: { ...stepsHistory, [today]: capped },
        });
      },

      getStepStreak: () => {
        const { stepsHistory, stepGoal } = get();
        let count = 0;
        for (let i = 0; i < 365; i++) {
          const dateStr = getDateStrOffset(i);
          const steps = stepsHistory[dateStr] ?? 0;
          if (steps >= stepGoal) {
            count++;
          } else {
            if (i === 0) continue;
            break;
          }
        }
        return count;
      },

      getStepPersonalBest: () => {
        const { stepsHistory } = get();
        const values = Object.values(stepsHistory);
        return values.length > 0 ? Math.max(...values) : 0;
      },

      // ─── Analytics ───────────────────────────────────────────────────
      analyticsEvents: [],

      recordEvent: (event, props) => {
        const { analyticsEvents } = get();
        const newEvent: AnalyticsEvent = {
          event,
          props: props || {},
          ts: Date.now(),
        };
        const updated = [...analyticsEvents, newEvent];
        const capped = updated.length > 5000 ? updated.slice(-5000) : updated;
        set({ analyticsEvents: capped });
      },

      getAnalyticsSummary: () => {
        const { analyticsEvents } = get();
        const eventCounts: Record<string, number> = {};
        const days = new Set<string>();
        let firstTs: number | null = null;

        for (const e of analyticsEvents) {
          eventCounts[e.event] = (eventCounts[e.event] || 0) + 1;
          days.add(new Date(e.ts).toISOString().slice(0, 10));
          if (firstTs === null || e.ts < firstTs) firstTs = e.ts;
        }

        return {
          totalEvents: analyticsEvents.length,
          uniqueDays: days.size,
          firstEventDate: firstTs ? new Date(firstTs).toISOString() : null,
          eventCounts,
        };
      },

      clearAnalytics: () => set({ analyticsEvents: [] }),
    }),

    {
      name: 'mboa-zen-storage',
      storage: createJSONStorage(() => (isWeb ? webStorage : AsyncStorage)),
      partialize: (state) => ({
        archetype: state.archetype,
        phone: state.phone,
        isPremium: state.isPremium,
        checkIns: state.checkIns, // ✅ now persisted
        checkInHistory: state.checkInHistory,
        harmonyScore: state.harmonyScore,
        lastCheckinDate: state.lastCheckinDate,
        waterIntake: state.waterIntake,
        waterGoal: state.waterGoal,
        waterHistory: state.waterHistory,
        lastWaterLogDate: state.lastWaterLogDate,
        celebratedMilestones: state.celebratedMilestones,
        njangiHistory: state.njangiHistory,
        njangiSavings: state.njangiSavings,
        todaySteps: state.todaySteps,
        stepsHistory: state.stepsHistory,
        stepGoal: state.stepGoal,
        analyticsEvents: state.analyticsEvents,
      }),
    }
  )
);

// DEV ONLY — expose store for debugging
if (typeof window !== 'undefined') {
  (window as any).__store = useUserStore;
}