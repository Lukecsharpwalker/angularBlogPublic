import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../shared/_models/comment.inteface';
import { SupabaseService } from '../../services/supabase.service';
import { Post } from '../../types/supabase';

@Injectable({ providedIn: 'root' })
export class ReaderApiService {
  supabaseService = inject(SupabaseService);

  async getPost(id: string): Promise<Post | null> {
    return null;
  }

  getComments(postId: string): Observable<Comment[]> {
    return [] as unknown as Observable<Comment[]>;
  }

  addComment(postId: string, comment: Comment): void {}

  deleteComment(commentId: string, postId: string): void {}

  async getPosts(): Promise<Post[] | null> {
    const { data: posts } = await this.supabaseService.getClient
      .from('posts')
      .select(
        `
        *,
        author:profiles ( id, username, avatar_url ),
        post_tags (
          tags ( id, name, color, icon )
        )
      `,
      )
      .eq('is_draft', false)
      .order('created_at', { ascending: false });

    return posts;
  }
}
