import { Profile } from '../../types/supabase';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { ReaderApiService } from '../../reader/_services/reader-api.service';

type ProfilesState = {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
};

const initialState: ProfilesState = {
  profiles: [],
  loading: false,
  error: null,
};

export const ProfilesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((state, profilesService = inject(ReaderApiService)) => ({
    async getProfiles() {
      patchState(state, { loading: true, error: null });
      try {
        const profiles = await profilesService.getProfiles();
        if (profiles) {
          patchState(state, { profiles, loading: false });
        } else {
          patchState(state, { error: 'No profiles found', loading: false });
        }
      } catch (error) {
        patchState(state, {
          error: 'Failed to fetch profiles',
          loading: false,
        });
      }
    },
  })),

  withHooks({
    onInit(store) {
      store.getProfiles();
    },
  }),
);
