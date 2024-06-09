import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReaderApiService } from '../../../../_services/reader-api.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
@Component({
  selector: 'comments',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  providers: [ReaderApiService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent  {
  comments$ = input<Comment[] | undefined>();
}
