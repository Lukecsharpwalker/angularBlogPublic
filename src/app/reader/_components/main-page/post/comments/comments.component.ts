import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { ReaderApiService } from '../../../../_services/reader-api.service';
import { Comment } from '../../../../../types/supabase';
import { CommentsStore } from './comments.store';
import { HasRoleDirective } from '../../../../../shared/_directives/has-role.directive';

@Component({
  selector: 'comments',
  standalone: true,
  providers: [ReaderApiService, CommentsStore],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HasRoleDirective],
})
export class CommentsComponent {
  @Input() postId!: string;
  comments = input<Comment[]>();

  private apiService = inject(ReaderApiService);
  private commentsStore = inject(CommentsStore);

  deleteComment(commentId: string): void {
    this.commentsStore.deleteComment(commentId, this.postId);
  }
}
