import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Post } from '../../supabase-types';

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
