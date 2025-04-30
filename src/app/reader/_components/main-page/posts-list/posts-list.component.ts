import { DatePipe, NgOptimizedImage, NgStyle } from '@angular/common';
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
import { RouterModule } from '@angular/router';
import { AboutMeComponent } from '../../../../shared/about-me/about-me.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PostsStore } from './posts.store';
import { TagsStore } from '../../../../shared/stores/tags.store';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    RouterModule,
    AboutMeComponent,
    PostCardComponent,
    NgOptimizedImage,
    NgStyle,
  ],
  providers: [DatePipe],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostsListComponent {
  scroll = viewChild<ElementRef<HTMLElement>>('scrollContainer');
  scrollProgress: WritableSignal<number> = signal(0);
  postStore = inject(PostsStore);
  tagsStore = inject(TagsStore);

  posts = this.postStore.posts;
  tags = this.tagsStore.tags;

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
}
