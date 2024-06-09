import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReaderApiService } from '../../_services/reader-api.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../../shared/_models/post.interface';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FirestoreModule, AsyncPipe, RouterLink, PostComponent, RouterModule],
  providers: [ReaderApiService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  apiService = inject(ReaderApiService);
  posts$: Observable<Post[]> = this.apiService.posts$;
}
