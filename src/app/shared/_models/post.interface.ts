export interface Post {
  id?: string;
  title: string;
  content: string;
  description?: string;
  author?: string;
  date?: string;
  image?: string;
  tags?: string[];
  likes?: number;
  comments?: Comment[];
  shares?: number;
  views?: number;
  status?: string;
  category?: string;
  commentsEnabled?: boolean;
  likesEnabled?: boolean;
}
