import {
  AsyncPipe,
  DatePipe,
  NgOptimizedImage,
  NgStyle,
} from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
  afterNextRender,
  ElementRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { FirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../../../shared/_models/post.interface';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { AboutMeComponent } from '../../../../shared/about-me/about-me.component';
import { PostCardComponent } from './post-card/post-card.component';
import { TAGS } from '../../../../utlis/tags';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    FirestoreModule,
    AsyncPipe,
    RouterModule,
    AboutMeComponent,
    PostCardComponent,
    NgOptimizedImage,
    NgStyle,
  ],
  providers: [ReaderApiService, DatePipe],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostsListComponent {
  scroll = viewChild<ElementRef<HTMLElement>>('scrollContainer');
  scrollProgress: WritableSignal<number> = signal(0);
  apiService = inject(ReaderApiService);
  dataPipe = inject(DatePipe);

  initialScroll = 2;

  constructor() {
    this.scrollProgress.set(this.initialScroll);
    afterNextRender(() => {
      console.log('Scroll:', this.scroll());
      this.scroll()?.nativeElement.addEventListener(
        'scroll',
        this.onScroll.bind(this),
      );
    });
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;

    const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;

    this.scrollProgress.set(scrollPercentage);
  }

  posts$: Observable<Post[]> = this.apiService.posts$.pipe(
    map((posts) =>
      posts.map((post) => ({
        ...post,
        dateJS: post.date.toDate(),
      })),
    ),
  );
  protected readonly TAGS = TAGS;
}
