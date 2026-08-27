
  export class OfflineAgent {
  private isInitialized = false;

  async initialize(): Promise<void> {
    console.log('OfflineAgent (web) initialized');
    this.isInitialized = true;
  }

  async startWorkoutSession(archetype: string): Promise<number> {
    console.log('startWorkoutSession (web):', archetype);
    return Date.now();
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
  }

  async logMeal(
    mealTime: string,
    mealOptionId: string | null,
    customMealName: string | null,
    calories: number,
    notes?: string
  ): Promise<number> {
    console.log('logMeal (web):', { mealTime, mealOptionId, calories });
    return Date.now();
  }

  async getTodayCalories(): Promise<number> {
    return 0;
  }

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

  async getExercisesForArchetype(archetype: string): Promise<any[]> {
    return [];
  }

  async searchFoods(query: string): Promise<any[]> {
    return [];
  }

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