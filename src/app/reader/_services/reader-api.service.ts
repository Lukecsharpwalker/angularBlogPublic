import { Injectable, inject } from '@angular/core';
import { collectionData, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../../shared/_models/post.interface';
import { Collections } from '../../shared/_enums/collections';

@Injectable()
export class ReaderApiService {

  private firestore = inject(Firestore);

  posts$: Observable<Post[]> = collectionData(collection(this.firestore, Collections.POST), {idField: 'id'}) as Observable<Post[]>;

  async getPost(id: string): Promise< Post | null> {
    return getDoc(doc(collection(this.firestore, Collections.POST), id)).then((doc) => {
      if (doc.exists()) {
        return doc.data() as Post;
      } else {
        return null;
      }
    });
  }

  getComments(postId: string) {
    return collectionData(
      collection(this.firestore, `${Collections.POST}/${postId}/${Collections.COMMENT}`), {idField: 'id'}) as Observable<Comment[]>;
  }

  addComment(postId: string, comment: Comment) {
    const newTaskRef = doc(collection(this.firestore, `${Collections.POST}/${postId}/${Collections.COMMENT}`));
     setDoc(newTaskRef, comment).finally(() => {
      console.log('comment added ', newTaskRef.id);
    });
  }
}
