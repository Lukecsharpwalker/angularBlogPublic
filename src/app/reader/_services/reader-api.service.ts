import { Injectable, inject } from '@angular/core';
import { collectionData, doc, setDoc, getDoc, deleteDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../../shared/_models/post.interface';
import { Collections } from '../../shared/_enums/collections';
import { Comment } from '../../shared/_models/comment.inteface';
import { QueryOperators } from '../../shared/_enums/query-operators';
import { PostField } from '../../shared/_enums/post-fields.enum';

@Injectable()
export class ReaderApiService {

  private firestore = inject(Firestore);
  private postsCollection = collection(this.firestore, Collections.POST)
  private postsQuery = query(
    this.postsCollection,
      where(PostField.IS_DRAFT, QueryOperators.EQUAL, false),
      orderBy(PostField.DATE, QueryOperators.DESC));

  posts$ = collectionData(this.postsQuery, { idField: 'id' }) as Observable<Post[]>;


  async getPost(id: string): Promise<Post | null> {
    return getDoc(doc(collection(this.firestore, Collections.POST), id)).then((doc) => {
      if (doc.exists()) {
        return doc.data() as Post;
      } else {
        return null;
      }
    });
  }

  getComments(postId: string): Observable<Comment[]> {
    return collectionData(
      collection(this.firestore, `${Collections.POST}/${postId}/${Collections.COMMENT}`), { idField: 'id' }) as Observable<Comment[]>;
  }

  addComment(postId: string, comment: Comment): void {
    const newTaskRef = doc(collection(this.firestore, `${Collections.POST}/${postId}/${Collections.COMMENT}`));
    setDoc(newTaskRef, comment).finally(() => {
      console.log('comment added ', newTaskRef.id);
    });
  }

  deleteComment(commentId: string, postId: string): void {
    const commentRef = doc(this.firestore, `${Collections.POST}/${postId}/${Collections.COMMENT}/${commentId}`);
    deleteDoc(commentRef);
  }

}
