import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Post } from '../../shared/_models/post.interface';
import { Collections } from '../../shared/_enums/collections';
import { Observable } from 'rxjs';

@Injectable()
export class AdminApiService {
  private firestore = inject(Firestore);

  addPost(post: Post): void {
    const newTaskRef = doc(collection(this.firestore, Collections.POST));
    setDoc(newTaskRef, post).finally(() => {
      const newTaskRefIds = doc(
        collection(this.firestore, `${Collections.POSTSIDS}`),
      );
      setDoc(newTaskRefIds, { id: newTaskRef.id }).catch((e) => {
        console.log('id error ID: ', e);
      });
    });
  }

  getPostById(id: string): Observable<Post | null> {
    const postDoc = doc(this.firestore, `${Collections.POST}/${id}`);
    return docData(postDoc) as Observable<Post | null>;
  }

  updatePost(id: string, post: Post): Promise<void> {
    const postDoc = doc(this.firestore, `${Collections.POST}/${id}`);
    return updateDoc(postDoc, { ...post });
  }
}
