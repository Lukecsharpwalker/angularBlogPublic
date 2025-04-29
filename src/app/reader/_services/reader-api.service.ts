import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../../shared/_models/post.interface';
import { Comment } from '../../shared/_models/comment.inteface';

@Injectable()
export class ReaderApiService {
  async getPost(id: string): Promise<Post | null> {
    return null;
  }

  getComments(postId: string): Observable<Comment[]> {
    return [] as unknown as Observable<Comment[]>;
  }

  addComment(postId: string, comment: Comment): void {}

  deleteComment(commentId: string, postId: string): void {}
}
