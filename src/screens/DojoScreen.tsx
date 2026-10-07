// ─── src/screens/DojoScreen.tsx ────────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';
import { MboaButton } from '../components/common/MboaButton';
import { getExercisesForArchetype } from '../data/workoutOptions';

// ─── DAY NAMES ──────────────────────────────────────────────────────────
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ─── WEB VIDEO PLAYER ───────────────────────────────────────────────────
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

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────
const DojoScreen = () => {
  const { archetype } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [showNextPrompt, setShowNextPrompt] = useState(false);

  const isWeb = Platform.OS === 'web';

  const exercises = getExercisesForArchetype(archetype || 'runner');
  const totalExercises = exercises.length;
  const currentExercise = exercises[currentIndex];
  const progress = totalExercises > 0 ? ((currentIndex + 1) / totalExercises) * 100 : 0;
  const isLastExercise = currentIndex === totalExercises - 1;

  // ─── TIMER ────────────────────────────────────────────────────────────
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

  useEffect(() => {
    setTimeLeft(currentExercise?.duration || 30);
    setIsPlaying(false);
    setShowNextPrompt(false);
  }, [currentIndex]);

  // ─── HANDLERS ─────────────────────────────────────────────────────────
  const handleExerciseComplete = () => {
    if (isLastExercise) {
      setIsWorkoutComplete(true);
      Alert.alert('Workout Complete', 'You finished all exercises. Good job.', [
        { text: 'OK' }
      ]);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

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

  // ─── EMPTY STATES ─────────────────────────────────────────────────────
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

  // ─── WORKOUT COMPLETE ─────────────────────────────────────────────────
  if (isWorkoutComplete) {
    return (
      <FadeInView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeLabel}>WORKOUT COMPLETE</Text>
          <Text style={styles.completeTitle}>Good Job</Text>
          <Text style={styles.completeSubtitle}>
            You finished all {totalExercises} exercises today.
          </Text>

          <View style={styles.completeStatsBox}>
            <View style={styles.completeStatItem}>
              <Text style={styles.completeStatValue}>{totalExercises}</Text>
              <Text style={styles.completeStatLabel}>exercises</Text>
            </View>
            <View style={styles.completeStatDivider} />
            <View style={styles.completeStatItem}>
              <Text style={styles.completeStatValue}>
                {Math.round(exercises.reduce((sum, e) => sum + (e.duration || 30), 0) / 60)}
              </Text>
              <Text style={styles.completeStatLabel}>minutes</Text>
            </View>
          </View>

          <MboaButton
            title="Start Again"
            onPress={() => {
              setIsWorkoutComplete(false);
              setCurrentIndex(0);
              setTimeLeft(exercises[0]?.duration || 30);
              setShowNextPrompt(false);
            }}
            variant="primary"
          />
        </View>
      </FadeInView>
    );
  }

  // ─── MAIN ─────────────────────────────────────────────────────────────
  const videoUrl = currentExercise?.video || '';

  return (
    <FadeInView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerArea}>
        <Text style={styles.eyebrow}>THE DOJO</Text>
        <Text style={styles.header}>{currentDay}</Text>
        <Text style={styles.subHeader}>
          {archetype.charAt(0).toUpperCase() + archetype.slice(1)} — {totalExercises} exercises
        </Text>

        {/* PROGRESS BAR */}
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
        {/* VIDEO AREA */}
        <View style={styles.videoContainer}>
          {isWeb && videoUrl ? (
            <WebVideo videoUrl={videoUrl} isPlaying={isPlaying} />
          ) : (
            <View style={styles.videoPlaceholder}>
              <Text style={styles.videoPlaceholderLabel}>FOLLOW ALONG</Text>
              <Text style={styles.videoPlaceholderTitle}>
                {currentExercise?.name || 'Exercise'}
              </Text>
              <Text style={styles.videoPlaceholderText}>
                Follow along at your own pace
              </Text>
            </View>
          )}

          {/* TIMER OVERLAY */}
          <View style={styles.timerOverlay}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>

          {/* EXERCISE COMPLETE OVERLAY */}
          {showNextPrompt && (
            <View style={styles.completedOverlay}>
              <View style={styles.completedBox}>
                <Text style={styles.completedLabel}>EXERCISE COMPLETE</Text>
                <Text style={styles.completedText}>
                  {isLastExercise ? 'Workout Complete' : 'Ready for the next one?'}
                </Text>
                <MboaButton
                  title={isLastExercise ? 'Finish Workout' : 'Next Exercise'}
                  onPress={handleExerciseComplete}
                  variant="primary"
                />
              </View>
            </View>
          )}
        </View>

        {/* EXERCISE INFO */}
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

        {/* UP NEXT */}
        {!isLastExercise && !showNextPrompt && exercises[currentIndex + 1] && (
          <View style={styles.upNextContainer}>
            <Text style={styles.upNextLabel}>UP NEXT</Text>
            <Text style={styles.upNextName}>
              {exercises[currentIndex + 1]?.name}
            </Text>
          </View>
        )}

        {/* NAVIGATION CONTROLS */}
        {!showNextPrompt && (
          <View style={styles.controlsContainer}>
            <View style={styles.controlButtonWrapper}>
              <MboaButton
                title="Previous"
                onPress={goToPrevious}
                variant="outline"
                disabled={currentIndex === 0}
              />
            </View>

            <View style={styles.controlButtonWrapper}>
              <MboaButton
                title={isPlaying ? 'Pause' : 'Play'}
                onPress={togglePlay}
                variant="primary"
              />
            </View>

            <View style={styles.controlButtonWrapper}>
              <MboaButton
                title={isLastExercise ? 'Finish' : 'Next'}
                onPress={goToNext}
                variant="outline"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </FadeInView>
  );
};

// ─── STYLES ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cleanWhite,
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
    color: Colors.earthBlack,
    marginBottom: 2,
  },
  subHeader: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
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
    backgroundColor: '#E0E0E0',
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
    ...FONTS.bold,
    color: Colors.textMuted,
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  // ─── VIDEO ──────────────────────────────────────────────────────────
  videoContainer: {
    width: '100%',
    maxWidth: 480,
    height: 250,
    backgroundColor: Colors.earthBlack,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  videoPlaceholderLabel: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 12,
  },
  videoPlaceholderTitle: {
    fontSize: 22,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    textAlign: 'center',
    marginBottom: 8,
  },
  videoPlaceholderText: {
    fontSize: 13,
    ...FONTS.regular,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  timerOverlay: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timerText: {
    fontSize: 20,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },

  // ─── COMPLETED OVERLAY ──────────────────────────────────────────────
  completedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 24,
  },
  completedBox: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  completedLabel: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 8,
  },
  completedText: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    textAlign: 'center',
    marginBottom: 20,
  },

  // ─── EXERCISE INFO ──────────────────────────────────────────────────
  exerciseInfoContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: Colors.softBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 20,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailChip: {
    backgroundColor: Colors.cleanWhite,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    ...FONTS.medium,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  detailValue: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.mboaGreen,
  },

  // ─── UP NEXT ────────────────────────────────────────────────────────
  upNextContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#F1FAF3',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.zenGold,
  },
  upNextLabel: {
    fontSize: 10,
    ...FONTS.bold,
    color: Colors.textMuted,
    letterSpacing: 2,
    marginBottom: 4,
  },
  upNextName: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.mboaGreen,
  },

  // ─── CONTROLS ───────────────────────────────────────────────────────
  controlsContainer: {
    width: '100%',
    maxWidth: 480,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  controlButtonWrapper: {
    flex: 1,
    alignItems: 'center',
  },

  // ─── EMPTY / COMPLETE ───────────────────────────────────────────────
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    ...FONTS.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  completeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  completeLabel: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 12,
  },
  completeTitle: {
    fontSize: 28,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    marginBottom: 8,
  },
  completeSubtitle: {
    fontSize: 15,
    ...FONTS.regular,
    color: Colors.textMuted,
    marginBottom: 24,
    textAlign: 'center',
  },
  completeStatsBox: {
    flexDirection: 'row',
    backgroundColor: Colors.softBg,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 24,
    alignItems: 'center',
  },
  completeStatItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  completeStatValue: {
    fontSize: 28,
    ...FONTS.bold,
    color: Colors.mboaGreen,
  },
  completeStatLabel: {
    fontSize: 11,
    ...FONTS.medium,
    color: Colors.textMuted,
    letterSpacing: 1,
    marginTop: 2,
  },
  completeStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#D9D9D9',
  },
});

export default DojoScreen;