// ─── src/screens/DojoScreen.tsx ──────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';
import { getExercisesForArchetype } from '../data/workoutOptions';
import { offlineAgent } from '../database/offlineAgent.web';

// ─── DAY NAMES ──────────────────────────────────────────────────────────
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ─── WEB VIDEO PLAYER ──────────────────────────────────────────────────
const WebVideo = ({ videoUrl, isPlaying }: { videoUrl: string; isPlaying: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        backgroundColor: 'black',
      }}
      loop
      muted
      playsInline
    />
  );
};

const DojoScreen = () => {
  const { archetype } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [showNextPrompt, setShowNextPrompt] = useState(false);
  
  const isWeb = Platform.OS === 'web';
  
  // ─── GET EXERCISES FOR ARCHETYPE ──────────────────────────────────────
  const exercises = getExercisesForArchetype(archetype || 'runner');
  const totalExercises = exercises.length;
  const currentExercise = exercises[currentIndex];
  const progress = totalExercises > 0 ? ((currentIndex + 1) / totalExercises) * 100 : 0;
  const isLastExercise = currentIndex === totalExercises - 1;

  // ─── TIMER LOGIC ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying || !currentExercise) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPlaying(false);
          setShowNextPrompt(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, currentExercise]);

  // ─── RESET TIMER ON EXERCISE CHANGE ──────────────────────────────────
  useEffect(() => {
    setTimeLeft(currentExercise?.duration || 30);
    setIsPlaying(false);
    setShowNextPrompt(false);
  }, [currentIndex]);

  // ─── HANDLE EXERCISE COMPLETE ────────────────────────────────────────
  const handleExerciseComplete = () => {
    if (isLastExercise) {
      setIsWorkoutComplete(true);
      Alert.alert('🎉 Workout Complete!', 'You finished all exercises!', [
        { text: 'OK' }
      ]);
    } else {
      // Move to next exercise
      setCurrentIndex(prev => prev + 1);
    }
  };

  // ─── NAVIGATION ──────────────────────────────────────────────────────
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (!isLastExercise) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleExerciseComplete();
    }
  };

  const togglePlay = () => {
    if (timeLeft === 0) {
      setTimeLeft(currentExercise?.duration || 30);
      setShowNextPrompt(false);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentDay = DAY_NAMES[new Date().getDay()];

  // ─── LOADING ──────────────────────────────────────────────────────────
  if (!archetype) {
    return (
      <FadeInView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Select Your Archetype</Text>
          <Text style={styles.emptySubtitle}>
            Complete the quiz on the Hub screen to unlock your personalized workouts.
          </Text>
        </View>
      </FadeInView>
    );
  }

  if (exercises.length === 0) {
    return (
      <FadeInView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Exercises Found</Text>
          <Text style={styles.emptySubtitle}>
            We couldn't find exercises for your archetype. Please try again.
          </Text>
        </View>
      </FadeInView>
    );
  }

  // ─── WORKOUT COMPLETE ────────────────────────────────────────────────
  if (isWorkoutComplete) {
    return (
      <FadeInView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>🏆</Text>
          <Text style={styles.completeTitle}>Workout Complete!</Text>
          <Text style={styles.completeSubtitle}>Great job today!</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setIsWorkoutComplete(false);
              setCurrentIndex(0);
              setTimeLeft(exercises[0]?.duration || 30);
              setShowNextPrompt(false);
            }}
          >
            <Text style={styles.resetButtonText}>🔄 Start Again</Text>
          </TouchableOpacity>
        </View>
      </FadeInView>
    );
  }

  const videoUrl = currentExercise?.video || '';

  return (
    <FadeInView style={styles.container}>
      {/* ─── HEADER ────────────────────────────────────────────────────── */}
      <View style={styles.headerArea}>
        <Text style={styles.eyebrow}>THE DOJO</Text>
        <Text style={styles.header}>{currentDay}</Text>
        <Text style={styles.subHeader}>
          {archetype.charAt(0).toUpperCase() + archetype.slice(1)} • {totalExercises} exercises
        </Text>

        {/* ─── PROGRESS BAR ────────────────────────────────────────────── */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1} / {totalExercises}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── VIDEO PLAYER ───────────────────────────────────────────── */}
        <View style={styles.videoContainer}>
          {isWeb ? (
            <WebVideo videoUrl={videoUrl} isPlaying={isPlaying} />
          ) : (
            <View style={styles.placeholderVideo}>
              <Text style={styles.placeholderText}>📱 Video Player</Text>
              <Text style={styles.placeholderSubtext}>{currentExercise?.name}</Text>
            </View>
          )}
          
          {/* ─── TIMER OVERLAY ────────────────────────────────────────── */}
          <View style={styles.timerOverlay}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>

          {/* ─── PLAY/PAUSE OVERLAY ──────────────────────────────────── */}
          <TouchableOpacity
            style={styles.playOverlay}
            onPress={togglePlay}
            activeOpacity={0.8}
          >
            <View style={styles.playButtonCircle}>
              <Text style={styles.playButtonText}>
                {isPlaying ? '⏸' : '▶️'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* ─── COMPLETED OVERLAY ────────────────────────────────────── */}
          {showNextPrompt && (
            <View style={styles.completedOverlay}>
              <View style={styles.completedBox}>
                <Text style={styles.completedEmoji}>✅</Text>
                <Text style={styles.completedText}>
                  {isLastExercise ? 'Workout Complete!' : 'Exercise Complete!'}
                </Text>
                {!isLastExercise && (
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleExerciseComplete}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.nextButtonText}>
                      Next Exercise →
                    </Text>
                  </TouchableOpacity>
                )}
                {isLastExercise && (
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleExerciseComplete}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.nextButtonText}>
                      Finish Workout 🏆
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>

        {/* ─── EXERCISE INFO ──────────────────────────────────────────── */}
        <View style={styles.exerciseInfoContainer}>
          <Text style={styles.exerciseName}>{currentExercise?.name}</Text>
          <Text style={styles.exerciseDescription}>{currentExercise?.description}</Text>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailChip}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{currentExercise?.duration}s</Text>
            </View>
            <View style={styles.detailChip}>
              <Text style={styles.detailLabel}>Difficulty</Text>
              <Text style={styles.detailValue}>{currentExercise?.difficulty}</Text>
            </View>
            {currentExercise?.sets && (
              <View style={styles.detailChip}>
                <Text style={styles.detailLabel}>Sets</Text>
                <Text style={styles.detailValue}>{currentExercise.sets}</Text>
              </View>
            )}
            {currentExercise?.reps && (
              <View style={styles.detailChip}>
                <Text style={styles.detailLabel}>Reps</Text>
                <Text style={styles.detailValue}>{currentExercise.reps}</Text>
              </View>
            )}
          </View>
        </View>

        {/* ─── UP NEXT ────────────────────────────────────────────────── */}
        {!isLastExercise && !showNextPrompt && exercises[currentIndex + 1] && (
          <View style={styles.upNextContainer}>
            <Text style={styles.upNextLabel}>⬇️ Up Next</Text>
            <Text style={styles.upNextName}>
              {exercises[currentIndex + 1]?.name}
            </Text>
          </View>
        )}

        {/* ─── NAVIGATION CONTROLS ────────────────────────────────────── */}
        {!showNextPrompt && (
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={[styles.controlButton, currentIndex === 0 && styles.controlButtonDisabled]}
              onPress={goToPrevious}
              disabled={currentIndex === 0}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonText}>◀ Prev</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButtonPrimary}
              onPress={togglePlay}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonPrimaryText}>
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={goToNext}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonText}>
                {isLastExercise ? '✅ Done' : 'Next ▶'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
    alignItems: 'center',
  },
  headerArea: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  eyebrow: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 4,
  },
  header: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    marginBottom: 2,
  },
  subHeader: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    backgroundColor: Colors.mboaGreen,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    ...FONTS.medium,
    color: Colors.textMuted,
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  videoContainer: {
    width: '100%',
    maxWidth: 480,
    height: 250,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  placeholderVideo: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  placeholderText: {
    fontSize: 32,
    color: Colors.textMuted,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: Colors.textMuted,
    marginTop: 8,
  },
  timerOverlay: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timerText: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.cleanWhite,
  },
  playButtonText: {
    fontSize: 28,
    color: Colors.cleanWhite,
  },
  completedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  completedBox: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.mboaGreen,
  },
  completedEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  completedText: {
    fontSize: 20,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: Colors.mboaGreen,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  nextButtonText: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
  exerciseInfoContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 20,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailChip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    ...FONTS.medium,
    color: Colors.textMuted,
  },
  detailValue: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.zenGold,
  },
  upNextContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  upNextLabel: {
    fontSize: 11,
    ...FONTS.medium,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  upNextName: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.zenGold,
  },
  controlsContainer: {
    width: '100%',
    maxWidth: 480,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  controlButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  controlButtonDisabled: {
    opacity: 0.3,
  },
  controlButtonPrimary: {
    flex: 1.5,
    backgroundColor: Colors.mboaGreen,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  controlButtonText: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
  controlButtonPrimaryText: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    ...FONTS.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  completeEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  completeTitle: {
    fontSize: 28,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    marginBottom: 4,
  },
  completeSubtitle: {
    fontSize: 16,
    ...FONTS.regular,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: Colors.mboaGreen,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  resetButtonText: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
});

export default DojoScreen;

