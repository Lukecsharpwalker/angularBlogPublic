import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Post } from '../../shared/_models/post.interface';
import { Collections } from '../../shared/_enums/collections';

@Injectable()
export class AdminApiService {
  private firestore = inject(Firestore);

  addPost(post: Post) {
    const newTaskRef = doc(collection(this.firestore, Collections.POST));
     setDoc(newTaskRef, post).finally(() => {
      console.log('Document written with ID: ', newTaskRef.id);
      const newTaskRefIds = doc(collection(this.firestore, `${Collections.POSTSIDS}`));
      setDoc(newTaskRefIds, {id: newTaskRef.id}).catch((e) => {
        console.log('id error ID: ', e);
      });
    });
  }
}
