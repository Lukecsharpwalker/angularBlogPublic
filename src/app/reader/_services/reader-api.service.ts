import { Injectable, inject } from '@angular/core';
import { collectionData, doc } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Blog } from '../../shared/_models/blog.interface';
import { getDoc } from 'firebase/firestore';

@Injectable()
export class ReaderApiService {

  private firestore = inject(Firestore);
  private collection = collection(this.firestore, 'blog');

  private collection2 = collection(this.firestore, 'blog');

  blog$ = collectionData(this.collection, {idField: 'id'}) as Observable<Blog[]>;

  async getPost(id: string): Promise< Blog | null> {
    return getDoc(doc(collection(this.firestore, 'blog'), id)).then((doc) => {
      if (doc.exists()) {
        return doc.data() as Blog;
      } else {
        return null;
      }
    });
  }
}
