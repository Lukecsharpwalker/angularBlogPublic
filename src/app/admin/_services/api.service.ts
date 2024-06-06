import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Blog } from '../../shared/_models/blog.interface';

@Injectable()
export class ApiService {
  firestore = inject(Firestore);
  http = inject(HttpClient);

  addBlog(blog: Blog) {
    const newTaskRef = doc(collection(this.firestore, 'blog'));
    setDoc(newTaskRef, blog);
  }


}
