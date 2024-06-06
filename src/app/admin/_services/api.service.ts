import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Blog } from '../../shared/_models/blog.interface';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  firestore = inject(Firestore);
  http = inject(HttpClient);

  addBlog(blog: Blog) {
    const newTaskRef = doc(collection(this.firestore, 'blog'));
     setDoc(newTaskRef, blog).finally(() => {
      console.log('Document written with ID: ', newTaskRef.id);
    });
  }
}
