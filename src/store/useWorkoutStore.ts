import { create } from 'zustand';
import { WorkoutExercise } from '../types';
import { WORKOUTS_DATABASE } from '../data/workouts';

interface WorkoutState {
  currentExercise: WorkoutExercise | null;
  allExercises: WorkoutExercise[];
  isActive: boolean;
  isPaused: boolean;
  timeRemaining: number;
  isRestPhase: boolean;
  currentRep: number;
  completedExercises: number[];
  
  loadExercises: () => void;
  selectExercise: (exercise: WorkoutExercise) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  currentExercise: null,
  allExercises: [],
  isActive: false,
  isPaused: false,
  timeRemaining: 0,
  isRestPhase: false,
  currentRep: 0,
  completedExercises: [],

  loadExercises: () => {
    set({ 
      allExercises: WORKOUTS_DATABASE, 
      currentExercise: WORKOUTS_DATABASE[0] || null,
      timeRemaining: WORKOUTS_DATABASE[0]?.duration_parameters.default_active_seconds || 0
    });
  },

  selectExercise: (exercise) => {
    set({
      currentExercise: exercise,
      timeRemaining: exercise.duration_parameters.default_active_seconds,
      isActive: false,
      isPaused: false,
      isRestPhase: false,
      currentRep: 0,
    });
  },

  startTimer: () => {
    const { currentExercise } = get();
    if (!currentExercise) return;
    set({ 
      isActive: true, 
      isPaused: false 
    });
  },

  pauseTimer: () => set((state) => ({ isPaused: !state.isPaused })),

  resetTimer: () => {
    const { currentExercise } = get();
    if (!currentExercise) return;
    set({ 
      isActive: false, 
      isPaused: false, 
      timeRemaining: currentExercise.duration_parameters.default_active_seconds, 
      isRestPhase: false, 
      currentRep: 0 
    });
  },

 tickTimer: () => { 
  // 1. Fetch the values from state first
  const { timeRemaining, isRestPhase, currentExercise, currentRep } = get();
  
  // 2. Run the safety check immediately after
  if (!currentExercise) return;

  if (timeRemaining <= 1) {
    if (!isRestPhase) {
      // Transition from Active Phase -> Rest Phase
      set({ 
        isRestPhase: true, 
        timeRemaining: currentExercise.duration_parameters.default_rest_seconds 
      });
    } else {
      // Rest Phase over. Check if target repetitions have been fulfilled
      const nextRep = currentRep + 1;
      if (nextRep >= currentExercise.duration_parameters.recommended_reps) {
        // Workout Complete
        set((state) => ({
          isActive: false,
          isRestPhase: false,
          timeRemaining: 0,
          completedExercises: [...state.completedExercises, currentExercise.id]
        }));
      } else {
        // Move into the next exercise cycle/rep
        set({
          isRestPhase: false,
          currentRep: nextRep,
          timeRemaining: currentExercise.duration_parameters.default_active_seconds
        });
      }
    }
  } else {
    set({ timeRemaining: timeRemaining - 1 });
  }
},
}));