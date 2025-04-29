import { Profile } from './profiles';
import { PostTagList } from './post-tags';

export type Post = {
  content: string;
  created_at: string | null;
  description: string;
  id: string;
  is_draft: boolean;
  title: string;
  user_id: string;
  author?: Profile;
  post_tags?: PostTagList[];
  comments?: Comment[];
};

export type PostInsert = {
  content: string;
  created_at?: string | null;
  description: string;
  id?: string;
  is_draft?: boolean;
  title: string;
  user_id: string;
};

export type PostUpdate = {
  content?: string;
  created_at?: string | null;
  description?: string;
  id?: string;
  is_draft?: boolean;
  title?: string;
  user_id?: string;
};

export type PostRelationships = [
  {
    foreignKeyName: 'posts_user_id_fkey';
    columns: ['user_id'];
    isOneToOne: false;
    referencedRelation: 'profiles';
    referencedColumns: ['id'];
  },
];
