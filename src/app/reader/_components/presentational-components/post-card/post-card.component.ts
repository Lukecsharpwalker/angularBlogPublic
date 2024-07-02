import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../../shared/_models/post.interface';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'blog-post-card',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() first : boolean = false;
  @Input() index : number = 1;
}
