import { Tag } from '../../types/supabase';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ReaderApiService } from '../../reader/_services/reader-api.service';

type TagsState = {
  tags: Tag[];
  loading: boolean;
  error: string | null;
};

const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
};

export const TagsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((state, tagsService = inject(ReaderApiService)) => ({
    async getTags() {
      patchState(state, { loading: true, error: null });
      try {
        const tags = await tagsService.getTags();
        if (tags) {
          patchState(state, { tags, loading: false });
        } else {
          patchState(state, { error: 'No tags found', loading: false });
        }
      } catch (error) {
        patchState(state, { error: 'Failed to fetch tags', loading: false });
      }
    },
  })),

  withHooks({
    onInit(store) {
      store.getTags();
    },
  }),
);
