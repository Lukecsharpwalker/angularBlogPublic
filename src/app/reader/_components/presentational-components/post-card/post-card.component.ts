import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../../shared/_models/post.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'blog-post-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() first : boolean = false;
}
