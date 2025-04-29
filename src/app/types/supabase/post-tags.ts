import { Tag } from './tags';

export type PostTag = {
  post_id: string;
  tag_id: number;
};

export type PostTagList = {
  tags: Tag;
};

export type PostTagInsert = {
  post_id: string;
  tag_id: number;
};

export type PostTagUpdate = {
  post_id?: string;
  tag_id?: number;
};

export type PostTagRelationships = [
  {
    foreignKeyName: 'post_tags_post_id_fkey';
    columns: ['post_id'];
    isOneToOne: false;
    referencedRelation: 'posts';
    referencedColumns: ['id'];
  },
  {
    foreignKeyName: 'post_tags_tag_id_fkey';
    columns: ['tag_id'];
    isOneToOne: false;
    referencedRelation: 'tags';
    referencedColumns: ['id'];
  },
];
