export interface Comment {
  id?: string;
  content: string;
  author?: string;
  date?: string;
  likes?: number;
  replies?: Comment[];
  status?: string;
  likesEnabled?: boolean;
  repliesEnabled?: boolean;
}
