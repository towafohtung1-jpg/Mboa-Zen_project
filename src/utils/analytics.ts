// ─── src/utils/analytics.ts ─────────────────────────────────────────────
// Local-only event tracking. Swap `persistEvent` for a real provider later.

import { useUserStore } from '../store/useUserStore';

export type EventName =
  | 'app_open'
  | 'onboarding_complete'
  | 'quiz_started'
  | 'archetype_selected'
  | 'guest_login'
  | 'phone_login'
  | 'water_intake_set'
  | 'check_in_complete'
  | 'meal_logged'
  | 'meal_view_detail'
  | 'workout_started'
  | 'workout_completed'
  | 'njangi_save'
  | 'njangi_item_added'
  | 'market_view'
  | 'premium_upgrade_clicked'
  | 'premium_upgrade_succeeded'
  | 'coach_booking_clicked'
  | 'coach_booked'
  | 'milestone_celebrated'
  | 'language_switched'
  | 'article_read';

export interface TrackOptions {
  [key: string]: string | number | boolean | null | undefined;
}

export const track = (event: EventName, props?: TrackOptions): void => {
  try {
    // Strip undefined to keep storage compact
    const clean: Record<string, any> = {};
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v !== undefined) clean[k] = v;
      }
    }

    const store = useUserStore.getState();
    store.recordEvent(event, clean);

    if (__DEV__) {
      console.log('[analytics]', event, clean);
    }
  } catch (err) {
    if (__DEV__) {
      console.warn('[analytics] failed to track', event, err);
    }
  }
};