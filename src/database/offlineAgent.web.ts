
// ─── MEMORY STORAGE ──────────────────────────────────────────────────
let mealLogs: any[] = [];
let workoutSessions: any[] = [];

export class OfflineAgent {
  private isInitialized = false;

  async initialize(): Promise<void> {
    console.log('OfflineAgent (web) initialized');
    this.isInitialized = true;
  }

  // ─── MEAL LOGGING ──────────────────────────────────────────────────
  async logMeal(
    mealTime: string,
    mealOptionId: string | null,
    customMealName: string | null,
    calories: number,
    notes?: string
  ): Promise<number> {
    console.log('logMeal (web):', { mealTime, mealOptionId, calories });
    
    const today = new Date().toISOString().split('T')[0];
    const id = Date.now();
    
    mealLogs.push({
      id,
      date: today,
      meal_time: mealTime,
      meal_option_id: mealOptionId,
      custom_meal_name: customMealName,
      calories,
      notes: notes || '',
      logged_at: new Date().toISOString(),
    });
    
    console.log('Meal logged in memory:', id);
    return id;
  }

  async getTodayCalories(): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const total = mealLogs
      .filter(log => log.date === today)
      .reduce((sum, log) => sum + log.calories, 0);
    
    console.log('Today\'s calories (web):', total);
    return total;
  }

  // ─── WORKOUT TRACKING ──────────────────────────────────────────────
  async startWorkoutSession(archetype: string): Promise<number> {
    console.log('startWorkoutSession (web):', archetype);
    const id = Date.now();
    workoutSessions.push({
      id,
      archetype,
      started_at: new Date().toISOString(),
      completed: false,
    });
    return id;
  }

  async completeWorkoutSession(
    sessionId: number,
    durationMinutes: number,
    exercisesCompleted: number,
    totalReps: number
  ): Promise<void> {
    console.log('completeWorkoutSession (web):', {
      sessionId,
      durationMinutes,
      exercisesCompleted,
      totalReps,
    });
    
    const session = workoutSessions.find(s => s.id === sessionId);
    if (session) {
      session.duration_minutes = durationMinutes;
      session.exercises_completed = exercisesCompleted;
      session.total_reps = totalReps;
      session.completed_at = new Date().toISOString();
      session.completed = true;
    }
  }

  // ─── CHECK-IN ──────────────────────────────────────────────────────
  async saveCheckin(
    hydration: boolean,
    nutrition: boolean,
    training: boolean
  ): Promise<void> {
    console.log('saveCheckin (web):', { hydration, nutrition, training });
  }

  async getCurrentStreak(): Promise<number> {
    return 0;
  }

  async getCheckinHistory(days: number): Promise<any[]> {
    return [];
  }

  // ─── EXERCISES ─────────────────────────────────────────────────────
  async getExercisesForArchetype(archetype: string): Promise<any[]> {
    return [];
  }

  async searchFoods(query: string): Promise<any[]> {
    return [];
  }

  // ─── SYNC QUEUE ────────────────────────────────────────────────────
  async queueEvent(eventType: string, payload: object): Promise<void> {
    console.log('queueEvent (web):', { eventType, payload });
  }

  async getPendingEvents(): Promise<any[]> {
    return [];
  }

  async markEventSynced(eventId: number): Promise<void> {
    console.log('markEventSynced (web):', eventId);
  }

  async markEventFailed(eventId: number, error: string): Promise<void> {
    console.log('markEventFailed (web):', { eventId, error });
  }

  // ─── TELEMETRY ────────────────────────────────────────────────────
  async recordTelemetry(eventType: string, context: string): Promise<void> {
    console.log('recordTelemetry (web):', { eventType, context });
  }

  async checkUpgradeTriggers(
    streak: number,
    hour: number,
    eventType: string
  ): Promise<any> {
    return null;
  }

  async recordOfferShown(triggerType: string, userResponse: string): Promise<void> {
    console.log('recordOfferShown (web):', { triggerType, userResponse });
  }
}

export const offlineAgent = new OfflineAgent();