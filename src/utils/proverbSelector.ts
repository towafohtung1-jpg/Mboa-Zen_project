import { PROVERBS_DATABASE } from '../data/proverbs';
import { Proverb } from '../types';

/**
 * Grabs a single proverb based on the current day of the month (1-31).
 * Maps perfectly to the 30-day database using modulo math.
 */
export const getDailyProverb = (): Proverb => {
  const today = new Date();
  const dayOfMonth = today.getDate(); // Returns 1 - 31
  const index = (dayOfMonth - 1) % PROVERBS_DATABASE.length;
  return PROVERBS_DATABASE[index];
};

/**
 * Fetches a completely random proverb from the database.
 * Used for refreshing or unlocking extra motivation cards.
 */
export const getRandomProverb = (): Proverb => {
  const randomIndex = Math.floor(Math.random() * PROVERBS_DATABASE.length);
  return PROVERBS_DATABASE[randomIndex];
};