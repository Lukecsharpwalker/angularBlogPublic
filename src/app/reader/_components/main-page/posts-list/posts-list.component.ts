import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirestoreModule } from '@angular/fire/firestore';
import { RouterLink, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../../../shared/_models/post.interface';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { PostComponent } from '../post/post.component';
import { CardComponent } from '../../../../shared/card/card.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [FirestoreModule, AsyncPipe, RouterLink, PostComponent, CardComponent, NgClass, RouterModule, DatePipe],
  providers: [ReaderApiService, DatePipe],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostsListComponent {
  apiService = inject(ReaderApiService);
  dataPipe = inject(DatePipe);

  posts$: Observable<Post[]> = this.apiService.posts$.pipe(
    map(posts => posts.map(post => ({
      ...post,
      dateJS: post.date.toDate(),
    })))
  );
}
