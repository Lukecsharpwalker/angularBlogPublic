import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { ReaderApiService } from '../../../../_services/reader-api.service';
import { Comment } from '../../../../../types/supabase';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const CommentsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((state, commentsService = inject(ReaderApiService)) => ({
    async getComments(postId: string) {
      patchState(state, { loading: true, error: null });
      try {
        const comments = await commentsService.getComments(postId);
        if (comments) {
          patchState(state, { comments, loading: false });
        } else {
          patchState(state, { error: 'No comments found', loading: false });
        }
      } catch (error) {
        patchState(state, {
          error: 'Failed to fetch comments',
          loading: false,
        });
      }
    },

    async addComment(postId: string, comment: Comment) {
      patchState(state, { loading: true, error: null });
      try {
        await commentsService.addComment(postId, comment);
        const comments = await commentsService.getComments(postId);
        if (comments) {
          patchState(state, { comments, loading: false });
        }
      } catch (error) {
        patchState(state, { error: 'Failed to add comment', loading: false });
      }
    },

    async deleteComment(commentId: string, postId: string) {
      patchState(state, { loading: true, error: null });
      try {
        await commentsService.deleteComment(commentId, postId);
        const comments = await commentsService.getComments(postId);
        if (comments) {
          patchState(state, { comments, loading: false });
        }
      } catch (error) {
        patchState(state, {
          error: 'Failed to delete comment',
          loading: false,
        });
      }
    },
  })),
);
