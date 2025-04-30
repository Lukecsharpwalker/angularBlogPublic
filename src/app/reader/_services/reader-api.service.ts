import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Comment, Post, Profile, Tag, PostTag } from '../../types/supabase';

@Injectable({ providedIn: 'root' })
export class ReaderApiService {
  supabaseService = inject(SupabaseService);

  async getPost(id: string): Promise<any | null> {
    const { data, error } = await this.supabaseService.getClient
      .from('posts')
      .select(
        `
      *,
      author:profiles ( id, username, avatar_url ),
      tags:post_tags!inner (
        tags ( id, name, color, icon )
      ),
      comments:comments (
        id, content, created_at, is_deleted, is_reported,
        author:profiles ( id, username, avatar_url )
      )
    `,
      )
      .eq('id', id)
      .single();

    return error ? null : data;
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

  async getProfiles(): Promise<Profile[] | null> {
    const { data: profiles, error } = await this.supabaseService.getClient
      .from('profiles')
      .select('*');
    return error ? null : profiles;
  }

  async getTags(): Promise<Tag[] | null> {
    const { data: tags, error } = await this.supabaseService.getClient
      .from('tags')
      .select('*');
    return error ? null : tags;
  }

  async getPostTags(postId: string): Promise<PostTag[] | null> {
    const { data: postTags, error } = await this.supabaseService.getClient
      .from('post_tags')
      .select('*, tags(*)')
      .eq('post_id', postId);
    return error ? null : postTags;
  }
}
