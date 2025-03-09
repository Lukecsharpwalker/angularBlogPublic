import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  input,
} from '@angular/core';
import { ReaderApiService } from '../../../../_services/reader-api.service';
import { Comment } from '../../../../../shared/_models/comment.inteface';
import { Roles } from '../../../../../shared/_enums/roles';
import { HasRoleDirective } from '../../../../../shared/_directives/has-role.directive';

@Component({
  selector: 'comments',
  standalone: true,
  providers: [ReaderApiService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  @Input() postId!: string;
  comments$ = input<Comment[] | undefined>();

  private apiService = inject(ReaderApiService);

  deleteComment(commentId: string): void {
    this.apiService.deleteComment(commentId, this.postId);
  }
}
