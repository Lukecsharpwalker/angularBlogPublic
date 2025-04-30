import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ReaderApiService } from '../../../../_services/reader-api.service';
import { CommentsStore } from '../comments/comments.store';
import { Comment } from '../../../../../types/supabase';

@Component({
  selector: 'add-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [ReaderApiService, CommentsStore],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  @Input() postId!: string;

  commentForm: FormGroup = new FormGroup({
    content: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  private commentsStore = inject(CommentsStore);

  onSubmit(): void {
    if (this.commentForm.valid) {
      const comment: Comment = {
        ...this.commentForm.value,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        is_deleted: false,
        is_reported: false,
        post_id: this.postId,
        user_id: null, // In a real app, this would be the current user's ID
      };
      this.commentsStore.addComment(this.postId, comment);
      this.commentForm.reset();
    }
  }
}
