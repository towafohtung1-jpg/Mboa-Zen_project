import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'mboa-zen-user-state';

export interface SavedState {
  onboardingComplete: boolean;
  archetype: string | null;
  selectedGoal: string | null;
  phone: string | null;
}

export const saveUserState = async (state: SavedState) => {
  try {
    const json = JSON.stringify(state);

    // Save to localStorage directly for web reliability
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(KEY, json);
      console.log('SAVE: stored in localStorage:', json);
    }

    // Also save to AsyncStorage for mobile
    await AsyncStorage.setItem(KEY, json);
  } catch (error) {
    console.log('Error saving state:', error);
  }
};

export const loadUserState = async (): Promise<SavedState | null> => {
  try {
    // Try localStorage first (web is more reliable)
    if (typeof window !== 'undefined' && window.localStorage) {
      const localRaw = window.localStorage.getItem(KEY);
      console.log('LOAD: from localStorage:', localRaw);
      if (localRaw) {
        return JSON.parse(localRaw);
      }
    }

    // Fallback to AsyncStorage
    const asyncRaw = await AsyncStorage.getItem(KEY);
    console.log('LOAD: from AsyncStorage:', asyncRaw);
    if (asyncRaw) {
      return JSON.parse(asyncRaw);
    }

    return null;
  } catch (error) {
    console.log('Error loading state:', error);
    return null;
  }
};

export const clearUserState = async () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(KEY);
    }
    await AsyncStorage.removeItem(KEY);
    console.log('Storage cleared');
  } catch (error) {
    console.log('Error clearing state:', error);
  }
};