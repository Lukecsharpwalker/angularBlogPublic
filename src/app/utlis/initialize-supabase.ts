import { SupabaseService } from '../services/supabase.service';
import { Subscription } from '@supabase/supabase-js';

export function supabaseInitializer(
  supabase: SupabaseService,
): () => { data: { subscription: Subscription } } {
  return () =>
    supabase.authChanges((_, session) => (supabase.session = session));
}
