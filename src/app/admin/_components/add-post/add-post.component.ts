import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../_services/api.service';
import { Firestore, FirestoreModule} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../../../shared/_models/blog.interface';

@Component({
  selector: 'blog-add-post',
  standalone: true,
  imports: [ReactiveFormsModule, FirestoreModule],
  providers: [ApiService],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostComponent {
  blogForm: FormGroup;

  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  firestore = inject(Firestore);
  http = inject(HttpClient);

  constructor() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      this.apiService.addBlog(this.blogForm.value);
    }
  }

}
