import { SafeHtml } from '@angular/platform-browser';
import { Timestamp } from 'firebase/firestore';
import { TableOfContentsInterface } from './tableOfContents.interface';

export interface Post {
  id?: string;
  title: string;
  content: string | SafeHtml;
  description?: string;
  author?: string;
  date: Timestamp;
  dateJS?: Date;
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
  isDraft?: boolean;
  updated?: Date;
  readingTime?: string;
  difficulty?: number;
  tableOfContents?: TableOfContentsInterface[];
}
