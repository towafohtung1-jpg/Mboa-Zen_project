/**
 * Converts a raw number of seconds into an MM:SS reading for high-intensity timers.
 * Example: 125 seconds -> "02:05"
 */
export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Scaffolds a unique, recognizable transaction string for simulation.
 * Critical for verifying logs with Orange Money / MTN MoMo payment mock flows.
 */
export const generateTransactionId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `TXN_MBOAZEN_${timestamp}_${random}`;
};

/**
 * Formats standard numbers into localized Cameroonian currency (FCFA).
 * Example: 5000 -> "FCFA 5.000" (using the french standard separator dot/space)
 */
export const formatFCFA = (amount: number): string => {
  return `FCFA ${amount.toLocaleString('fr-FR')}`;
};

/**
 * Aggregates check-in boolean values and returns an average percentage integer.
 * Example: { hydration: true, nutrition: true, training: false } -> 67
 */
export const calculateHarmonyScore = (checkIns: Record<string, boolean>): number => {
  const values = Object.values(checkIns);
  if (values.length === 0) return 0;
  
  const completed = values.filter(Boolean).length;
  return Math.round((completed / values.length) * 100);
};