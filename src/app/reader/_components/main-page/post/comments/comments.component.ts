import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReaderApiService } from '../../../../_services/reader-api.service';
import { Comment } from '../../../../../shared/_models/comment.inteface';
@Component({
  selector: 'comments',
  standalone: true,
  imports: [],
  providers: [ReaderApiService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent  {
  comments$ = input<Comment[] | undefined>();
}
