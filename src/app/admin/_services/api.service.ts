import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Post } from '../../shared/_models/post.interface';

@Injectable()
export class ApiService {
  private firestore = inject(Firestore);

  addBlog(blog: Post) {
    const newTaskRef = doc(collection(this.firestore, 'blog'));
     setDoc(newTaskRef, blog).finally(() => {
      console.log('Document written with ID: ', newTaskRef.id);
    });
  }
}
