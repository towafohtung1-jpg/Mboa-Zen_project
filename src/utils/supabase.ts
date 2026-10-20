// ─── src/utils/supabase.ts ──────────────────────────────────────────────
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://brnjctbqzhseodexjrxp.supabase.co';
const supabaseAnonKey = 'sb_publishable__C0EB9111GDFkCKpTg1fQA_HZhHgZ2d';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});