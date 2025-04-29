import { Post } from '../../../../types/supabase';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ReaderApiService } from '../../../_services/reader-api.service';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((state, postService = inject(ReaderApiService)) => ({
    async getPosts() {
      patchState(state, { loading: true, error: null });
      try {
        const posts = await postService.getPosts();
        if (posts) {
          patchState(state, { posts, loading: false });
        } else {
          patchState(state, { error: 'No posts found', loading: false });
        }
      } catch (error) {
        patchState(state, { error: 'Failed to fetch posts', loading: false });
      }
    },
  })),
  withHooks({
    onInit(store) {
      store.getPosts();
    },
  }),
);
