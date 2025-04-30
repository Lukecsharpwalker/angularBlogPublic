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
  commentForm: FormGroup;

  private fb = inject(FormBuilder);
  private apiService = inject(ReaderApiService);
  private commentsStore = inject(CommentsStore);

  constructor() {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }

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
