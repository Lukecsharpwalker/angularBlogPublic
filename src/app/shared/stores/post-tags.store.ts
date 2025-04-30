import { PostTag } from '../../types/supabase';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ReaderApiService } from '../../reader/_services/reader-api.service';

type PostTagsState = {
  postTags: PostTag[];
  loading: boolean;
  error: string | null;
};

const initialState: PostTagsState = {
  postTags: [],
  loading: false,
  error: null,
};

export const PostTagsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((state, postTagsService = inject(ReaderApiService)) => ({
    async getPostTags(postId: string) {
      patchState(state, { loading: true, error: null });
      try {
        const postTags = await postTagsService.getPostTags(postId);
        if (postTags) {
          patchState(state, { postTags, loading: false });
        } else {
          patchState(state, { error: 'No post tags found', loading: false });
        }
      } catch (error) {
        patchState(state, {
          error: 'Failed to fetch post tags',
          loading: false,
        });
      }
    },
  })),
);
