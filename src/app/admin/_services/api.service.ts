import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Post } from '../../shared/_models/post.interface';
import { Collections } from '../../shared/_enums/collections';

@Injectable()
export class ApiService {
  private firestore = inject(Firestore);

  addPost(post: Post) {
    const newTaskRef = doc(collection(this.firestore, Collections.POST));
     setDoc(newTaskRef, post).finally(() => {
      console.log('Document written with ID: ', newTaskRef.id);
    });
  }
}
