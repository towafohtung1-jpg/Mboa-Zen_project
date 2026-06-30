import { create } from 'zustand';
import { Proverb } from '../types';
import { getDailyProverb, getRandomProverb } from '../utils/proverbSelector';

interface ProverbState {
  currentProverb: Proverb;
  refreshProverb: () => void;
  loadRandomProverb: () => void;
}

export const useProverbStore = create<ProverbState>((set) => ({
  currentProverb: getDailyProverb(),
  
  refreshProverb: () => set({ currentProverb: getDailyProverb() }),
  
  loadRandomProverb: () => set({ currentProverb: getRandomProverb() }),
}));