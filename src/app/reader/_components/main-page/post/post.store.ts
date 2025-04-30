import { Post } from '../../../../types/supabase';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { ReaderApiService } from '../../../_services/reader-api.service';

type PostState = {
  post: Post | null;
  loading: boolean;
  error: string | null;
};

const initialState: PostState = {
  post: null,
  loading: false,
  error: null,
};

export const PostStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((state, postService = inject(ReaderApiService)) => ({
    async getPost(id: string) {
      patchState(state, { loading: true, error: null });
      try {
        const post = await postService.getPost(id);
        if (post) {
          patchState(state, { post, loading: false });
        } else {
          patchState(state, { error: 'Post not found', loading: false });
        }
      } catch (error) {
        patchState(state, { error: 'Failed to fetch post', loading: false });
      }
    },
  })),
);
