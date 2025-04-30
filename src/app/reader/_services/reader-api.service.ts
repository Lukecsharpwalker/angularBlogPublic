import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupabaseService } from '../../services/supabase.service';
import { Comment, Post } from '../../types/supabase';

@Injectable({ providedIn: 'root' })
export class ReaderApiService {
  supabaseService = inject(SupabaseService);

  async getPost(id: string): Promise<Post | null> {
    const { data: post, error } = await this.supabaseService.getClient
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
      .eq('id', id)
      .single();
    return error ? null : post;
  }

  async getComments(postId: string): Promise<Comment[]> {
    const { data: comments, error } = await this.supabaseService.getClient
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    return error ? [] : comments;
  }

  async addComment(postId: string, comment: Comment): Promise<void> {
    const { error } = await this.supabaseService.getClient
      .from('comments')
      .insert({ ...comment, post_id: postId });
  }

  async deleteComment(commentId: string, postId: string): Promise<void> {
    const { error } = await this.supabaseService.getClient
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('post_id', postId);
  }

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
