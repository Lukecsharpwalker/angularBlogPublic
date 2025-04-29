import { Component, computed, input } from '@angular/core';
import { LabelComponent } from '../label/label.component';
import { RouterLink } from '@angular/router';
import { Post } from '../../../../../supabase-types';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [LabelComponent, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  post = input.required<Post>();
}
