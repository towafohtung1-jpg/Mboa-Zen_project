// ─── src/utils/notifications.ts ────────────────────────────────────────

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// ─── TYPES ──────────────────────────────────────────────────────────────

type Archetype = 'runner' | 'warrior' | 'guardian';

type ReminderTime = {
  hour: number;
  minute: number;
  message: string;
};

// ─── ARCHETYPE TIMING CONFIG ────────────────────────────────────────────

const REMINDERS: Record<Archetype, ReminderTime[]> = {
  runner: [
    { hour: 6, minute: 30, message: 'You burn fast — start the day with water.' },
    { hour: 10, minute: 0, message: 'Mid-morning water check. How many glasses today?' },
    { hour: 13, minute: 0, message: 'After lunch — water time.' },
    { hour: 16, minute: 0, message: 'Afternoon heat. Drink a glass of water.' },
    { hour: 19, minute: 0, message: 'Last glass before you rest. Water don dey call.' },
  ],
  warrior: [
    { hour: 6, minute: 0, message: 'Before you start work — drink water.' },
    { hour: 9, minute: 0, message: 'Break time. Water for the body.' },
    { hour: 12, minute: 0, message: 'Midday — big glass now.' },
    { hour: 16, minute: 0, message: 'Replace what you sweat. Drink water.' },
    { hour: 19, minute: 0, message: 'One more glass before rest.' },
  ],
  guardian: [
    { hour: 7, minute: 0, message: 'Good morning — start with water.' },
    { hour: 13, minute: 0, message: 'Afternoon — time for a glass of water.' },
    { hour: 19, minute: 0, message: 'Evening water check. Drink one more.' },
  ],
};

// ─── NOTIFICATION HANDLER ───────────────────────────────────────────────
// Tells the app how to show notifications when the app is foregrounded.

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// ─── REQUEST PERMISSION ─────────────────────────────────────────────────

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    if (!Device.isDevice) {
      console.log('Notifications: not a physical device, skipping.');
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('water-reminders', {
        name: 'Water Reminders',
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#007A33',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  } catch (error) {
    console.log('Notification permission error:', error);
    return false;
  }
}

// ─── CANCEL ALL REMINDERS ───────────────────────────────────────────────

export async function cancelAllReminders(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.log('Cancel reminders error:', error);
  }
}

// ─── SCHEDULE ARCHETYPE REMINDERS ───────────────────────────────────────

export async function scheduleArchetypeReminders(
  archetype: Archetype
): Promise<void> {
  try {
    // Clear existing reminders first so we don't duplicate
    await cancelAllReminders();

    const reminders = REMINDERS[archetype];
    if (!reminders || reminders.length === 0) return;

    for (const reminder of reminders) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '💧 Mboa-Zen',
          body: reminder.message,
          sound: false,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: reminder.hour,
          minute: reminder.minute,
          channelId: 'water-reminders',
        },
      });
    }

    console.log(`Scheduled ${reminders.length} reminders for ${archetype}`);
  } catch (error) {
    console.log('Schedule reminders error:', error);
  }
}