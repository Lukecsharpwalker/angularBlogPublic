import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirestoreModule } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../../../shared/_models/post.interface';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { PostComponent } from '../post/post.component';
import { PostCardComponent } from '../../presentational-components/post-card/post-card.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [FirestoreModule, AsyncPipe, RouterLink, PostComponent, PostCardComponent, NgClass],
  providers: [ReaderApiService],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent {
  apiService = inject(ReaderApiService);
  posts$: Observable<Post[]> = this.apiService.posts$;
}
