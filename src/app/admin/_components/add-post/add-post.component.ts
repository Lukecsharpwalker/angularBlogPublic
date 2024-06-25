import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../../_services/admin-api.service';
import { FirestoreModule} from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'blog-add-post',
  standalone: true,
  imports: [ReactiveFormsModule, FirestoreModule, AsyncPipe, FormsModule, EditorModule],
  providers: [AdminApiService, NgModel],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostComponent {
  blogForm: FormGroup;

  private fb = inject(FormBuilder);
  private apiService = inject(AdminApiService);

  constructor() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      this.apiService.addPost(this.blogForm.value);
    }
  }
}
