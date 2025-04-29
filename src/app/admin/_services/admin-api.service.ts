import { Injectable, inject } from '@angular/core';
import { Post } from '../../shared/_models/post.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AdminApiService {
  addPost(post: Post): void {}

  getPostById(id: string): Observable<Post | null> {
    return null as unknown as Observable<Post | null>;
  }

  updatePost(id: string, post: Post): Promise<void> {
    return Promise.resolve();
  }
}
