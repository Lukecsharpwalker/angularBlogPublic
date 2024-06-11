import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReaderApiService } from '../../../../_services/reader-api.service';

@Component({
  selector: 'add-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [ReaderApiService],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCommentComponent {
  @Input() postId!: string;
  commentForm: FormGroup;

  private fb = inject(FormBuilder);
  private apiService = inject(ReaderApiService);

  constructor() {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      this.apiService.addComment(this.postId, this.commentForm.value);
      this.commentForm.reset();
    }
  }
}
