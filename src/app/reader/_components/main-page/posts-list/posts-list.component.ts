import { AsyncPipe, NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirestoreModule } from '@angular/fire/firestore';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../../../shared/_models/post.interface';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { PostComponent } from '../post/post.component';
import { CardComponent } from '../../presentational-components/post-card/card.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [FirestoreModule, AsyncPipe, RouterLink, PostComponent, CardComponent, NgClass, RouterModule],
  providers: [ReaderApiService],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostsListComponent {
  apiService = inject(ReaderApiService);
  posts$: Observable<Post[]> = this.apiService.posts$;
}
