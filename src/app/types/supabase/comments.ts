import { Profile } from './profiles';

export type Comment = {
  content: string;
  created_at: string | null;
  id: string;
  is_deleted: boolean | null;
  is_reported: boolean | null;
  post_id: string;
  user_id: string | null;
  author: Profile | null;
};

export type CommentInsert = {
  content: string;
  created_at?: string | null;
  id?: string;
  is_deleted?: boolean | null;
  is_reported?: boolean | null;
  post_id: string;
  user_id?: string | null;
};

export type CommentUpdate = {
  content?: string;
  created_at?: string | null;
  id?: string;
  is_deleted?: boolean | null;
  is_reported?: boolean | null;
  post_id?: string;
  user_id?: string | null;
};

export type CommentRelationships = [
  {
    foreignKeyName: 'comments_post_id_fkey';
    columns: ['post_id'];
    isOneToOne: false;
    referencedRelation: 'posts';
    referencedColumns: ['id'];
  },
  {
    foreignKeyName: 'comments_user_id_fkey';
    columns: ['user_id'];
    isOneToOne: false;
    referencedRelation: 'profiles';
    referencedColumns: ['id'];
  },
];
