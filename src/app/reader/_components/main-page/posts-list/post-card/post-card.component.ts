import { Component, computed, input } from '@angular/core';
import { Post } from '../../../../../shared/_models/post.interface';
import { LabelComponent } from '../label/label.component';
import { TAGS } from '../../../../../utlis/tags';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [LabelComponent, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  tagsMock = ['HTML', 'CSS', 'TypeScript', 'SSG/SSR'];
  tags = TAGS.filter((tag) => this.tagsMock.includes(tag.name));

  post = input.required<Post>();
  description = computed(() => {
    return this.post().description;
  });
}
