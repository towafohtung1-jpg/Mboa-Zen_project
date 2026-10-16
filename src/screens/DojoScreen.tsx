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
import { useSwipeTabs } from '../hooks/useSwipeTabs';
import { useTranslation } from '../i18n/useTranslation';
import { track } from '../utils/analytics';

// ─── DAY NAMES ──────────────────────────────────────────────────────────
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ─── WEB VIDEO PLAYER ───────────────────────────────────────────────────
const WebVideo = ({ videoUrl, isPlaying }: { videoUrl: string; isPlaying: boolean }) => {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play?.().catch(() => {});
      } else {
        videoRef.current.pause?.();
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
  const {
    archetype,
    todaySteps,
    stepGoal,
    getStepStreak,
    getStepPersonalBest,
  } = useUserStore();
  const { t, language } = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [showNextPrompt, setShowNextPrompt] = useState(false);

  // Track "started" only once per screen session
  const hasTrackedStart = useRef(false);

  const panHandlers = useSwipeTabs();

  // Scroll-to-top
  const scrollRef = useRef<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowScrollTop(y > 400);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

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
      const totalSeconds = exercises.reduce((sum, e) => sum + (e.duration || 30), 0);
      track('workout_completed', {
        exercises: totalExercises,
        duration_seconds: totalSeconds,
        archetype,
      });
      Alert.alert(t('dojo.alertTitle'), t('dojo.alertBody'), [
        { text: t('common.ok') || 'OK' },
      ]);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (!isLastExercise) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleExerciseComplete();
    }
  };

  const togglePlay = () => {
    if (timeLeft === 0) {
      setTimeLeft(currentExercise?.duration || 30);
      setShowNextPrompt(false);
    }
    if (!isPlaying && !hasTrackedStart.current) {
      hasTrackedStart.current = true;
      track('workout_started', { archetype });
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
      <FadeInView style={styles.container} {...panHandlers}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>{t('dojo.selectArchetype')}</Text>
          <Text style={styles.emptySubtitle}>{t('dojo.selectArchetypeSub')}</Text>
        </View>
      </FadeInView>
    );
  }

  if (exercises.length === 0) {
    return (
      <FadeInView style={styles.container} {...panHandlers}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>{t('dojo.noExercises')}</Text>
          <Text style={styles.emptySubtitle}>{t('dojo.noExercisesSub')}</Text>
        </View>
      </FadeInView>
    );
  }

  // ─── WORKOUT COMPLETE ─────────────────────────────────────────────────
  if (isWorkoutComplete) {
    return (
      <FadeInView style={styles.container} {...panHandlers}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeLabel}>{t('dojo.workoutComplete')}</Text>
          <Text style={styles.completeTitle}>{t('dojo.goodJob')}</Text>
          <Text style={styles.completeSubtitle}>
            {t('dojo.goodJobSub').replace('{n}', String(totalExercises))}
          </Text>

          <View style={styles.completeStatsBox}>
            <View style={styles.completeStatItem}>
              <Text style={styles.completeStatValue}>{totalExercises}</Text>
              <Text style={styles.completeStatLabel}>{t('dojo.exercisesLabel')}</Text>
            </View>
            <View style={styles.completeStatDivider} />
            <View style={styles.completeStatItem}>
              <Text style={styles.completeStatValue}>
                {Math.round(exercises.reduce((sum, e) => sum + (e.duration || 30), 0) / 60)}
              </Text>
              <Text style={styles.completeStatLabel}>{t('dojo.minutesLabel')}</Text>
            </View>
          </View>

          <MboaButton
            title={t('dojo.startAgain')}
            onPress={() => {
              setIsWorkoutComplete(false);
              setCurrentIndex(0);
              setTimeLeft(exercises[0]?.duration || 30);
              setShowNextPrompt(false);
              hasTrackedStart.current = false;
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
    <FadeInView style={styles.container} {...panHandlers}>
      <View style={styles.headerArea}>
        <Text style={styles.eyebrow}>{t('dojo.eyebrow')}</Text>
        <Text style={styles.header}>{currentDay}</Text>
        <Text style={styles.subHeader}>
          {archetype.charAt(0).toUpperCase() + archetype.slice(1)} — {totalExercises} exercises
        </Text>

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
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
              <Text style={styles.videoPlaceholderLabel}>{t('dojo.videoLabel')}</Text>
              <Text style={styles.videoPlaceholderTitle}>
                {currentExercise?.name || t('dojo.exerciseFallback')}
              </Text>
              <Text style={styles.videoPlaceholderText}>{t('dojo.videoPlaceholder')}</Text>
            </View>
          )}

          <View style={styles.timerOverlay}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>

          {showNextPrompt && (
            <View style={styles.completedOverlay}>
              <View style={styles.completedBox}>
                <Text style={styles.completedLabel}>{t('dojo.exerciseComplete')}</Text>
                <Text style={styles.completedText}>
                  {isLastExercise ? t('dojo.workoutComplete') : t('dojo.readyNext')}
                </Text>
                <MboaButton
                  title={isLastExercise ? t('dojo.finishWorkout') : t('dojo.nextExercise')}
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
          <Text style={styles.exerciseDescription}>
            {language === 'pidgin'
              ? currentExercise?.description_pidgin || currentExercise?.description
              : language === 'fr'
              ? currentExercise?.description_fr || currentExercise?.description
              : currentExercise?.description}
          </Text>

          <View style={styles.detailsRow}>
            <View style={styles.detailChip}>
              <Text style={styles.detailLabel}>{t('dojo.duration')}</Text>
              <Text style={styles.detailValue}>{currentExercise?.duration}s</Text>
            </View>
            <View style={styles.detailChip}>
              <Text style={styles.detailLabel}>{t('dojo.difficulty')}</Text>
              <Text style={styles.detailValue}>
                {currentExercise?.difficulty ? t(`difficulty.${currentExercise.difficulty}`) : ''}
              </Text>
            </View>
            {currentExercise?.sets && (
              <View style={styles.detailChip}>
                <Text style={styles.detailLabel}>{t('dojo.sets')}</Text>
                <Text style={styles.detailValue}>{currentExercise.sets}</Text>
              </View>
            )}
            {currentExercise?.reps && (
              <View style={styles.detailChip}>
                <Text style={styles.detailLabel}>{t('dojo.reps')}</Text>
                <Text style={styles.detailValue}>{currentExercise.reps}</Text>
              </View>
            )}
          </View>
        </View>

        {/* UP NEXT */}
        {!isLastExercise && !showNextPrompt && exercises[currentIndex + 1] && (
          <View style={styles.upNextContainer}>
            <Text style={styles.upNextLabel}>{t('dojo.upNext')}</Text>
            <Text style={styles.upNextName}>{exercises[currentIndex + 1]?.name}</Text>
          </View>
        )}

        {/* NAVIGATION CONTROLS */}
        {!showNextPrompt && (
          <View style={styles.controlsContainer}>
            <View style={styles.controlButtonWrapper}>
              <MboaButton
                title={t('dojo.previous')}
                onPress={goToPrevious}
                variant="outline"
                disabled={currentIndex === 0}
              />
            </View>

            <View style={styles.controlButtonWrapper}>
              <MboaButton
                title={isPlaying ? t('dojo.pause') : t('dojo.play')}
                onPress={togglePlay}
                variant="primary"
              />
            </View>

            <View style={styles.controlButtonWrapper}>
              <MboaButton
                title={isLastExercise ? t('dojo.finish') : t('dojo.next')}
                onPress={goToNext}
                variant="outline"
              />
            </View>
          </View>
        )}

        {/* STEPS CARD */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsEyebrow}>{t('dojo.stepsTitle')}</Text>

          {isWeb ? (
            <View>
              <Text style={styles.stepsPlaceholderTitle}>{t('dojo.stepsOnWeb')}</Text>
              <Text style={styles.stepsPlaceholderText}>{t('dojo.stepsInstall')}</Text>
              <Text style={styles.stepsPlaceholderNote}>{t('dojo.stepsComingSoon')}</Text>
            </View>
          ) : (
            <View>
              <View style={styles.stepsValueRow}>
                <Text style={styles.stepsValue}>{todaySteps.toLocaleString()}</Text>
                <Text style={styles.stepsValueLabel}>{t('dojo.steps')}</Text>
              </View>

              <View style={styles.stepsProgressBg}>
                <View
                  style={[
                    styles.stepsProgressFill,
                    { width: `${Math.min((todaySteps / stepGoal) * 100, 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.stepsProgressText}>
                {t('dojo.stepsGoal').replace('{n}', stepGoal.toLocaleString())}
              </Text>

              <View style={styles.stepsStreakRow}>
                <Text style={styles.stepsStreak}>
                  {t('dojo.stepsStreak').replace('{n}', String(getStepStreak()))}
                </Text>
                <Text style={styles.stepsBest}>
                  {t('dojo.stepsBest').replace('{n}', getStepPersonalBest().toLocaleString())}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {showScrollTop && (
        <TouchableOpacity
          style={styles.scrollTopButton}
          onPress={scrollToTop}
          activeOpacity={0.8}
        >
          <Text style={styles.scrollTopArrow}>↑</Text>
        </TouchableOpacity>
      )}
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
  header: { fontSize: 24, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 2 },
  subHeader: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  progressContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: { height: 6, backgroundColor: Colors.mboaGreen, borderRadius: 3 },
  progressText: { fontSize: 12, ...FONTS.bold, color: Colors.textMuted },
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
  timerText: { fontSize: 20, ...FONTS.bold, color: Colors.cleanWhite },

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
  completedBox: { width: '100%', maxWidth: 320, alignItems: 'center' },
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
  detailsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
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
  detailValue: { fontSize: 14, ...FONTS.bold, color: Colors.mboaGreen },

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
  upNextName: { fontSize: 16, ...FONTS.bold, color: Colors.mboaGreen },

  controlsContainer: {
    width: '100%',
    maxWidth: 480,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  controlButtonWrapper: { flex: 1, alignItems: 'center' },

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
  completeStatItem: { alignItems: 'center', paddingHorizontal: 20 },
  completeStatValue: { fontSize: 28, ...FONTS.bold, color: Colors.mboaGreen },
  completeStatLabel: {
    fontSize: 11,
    ...FONTS.medium,
    color: Colors.textMuted,
    letterSpacing: 1,
    marginTop: 2,
  },
  completeStatDivider: { width: 1, height: 40, backgroundColor: '#D9D9D9' },

  stepsCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#F1FAF3',
    borderRadius: 14,
    padding: 18,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.mboaGreen,
  },
  stepsEyebrow: {
    fontSize: 10,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 2,
    marginBottom: 10,
  },
  stepsPlaceholderTitle: {
    fontSize: 15,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 6,
  },
  stepsPlaceholderText: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 19,
    marginBottom: 10,
  },
  stepsPlaceholderNote: {
    fontSize: 12,
    ...FONTS.medium,
    color: Colors.mboaGreen,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  stepsValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 14,
  },
  stepsValue: { fontSize: 36, ...FONTS.bold, color: Colors.mboaGreen, lineHeight: 40 },
  stepsValueLabel: { fontSize: 14, ...FONTS.medium, color: Colors.textMuted },
  stepsProgressBg: {
    height: 8,
    backgroundColor: '#D9E9DD',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  stepsProgressFill: { height: 8, backgroundColor: Colors.mboaGreen, borderRadius: 4 },
  stepsProgressText: {
    fontSize: 12,
    ...FONTS.medium,
    color: Colors.textMuted,
    marginBottom: 14,
  },
  stepsStreakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
  },
  stepsStreak: { fontSize: 13, ...FONTS.bold, color: Colors.mboaGreen },
  stepsBest: { fontSize: 12, ...FONTS.medium, color: Colors.textMuted },

  scrollTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.mboaGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: Colors.zenGold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  scrollTopArrow: { fontSize: 24, ...FONTS.bold, color: Colors.cleanWhite },
});

export default DojoScreen;