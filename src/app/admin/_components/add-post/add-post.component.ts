import { afterNextRender, ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../../_services/admin-api.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { EditorModule } from 'primeng/editor';
import { HighlightModule } from 'ngx-highlightjs';
import { loadQuillModules } from '../../../utlis/quill-configuration';
import { QuillEditorComponent } from 'ngx-quill'
import { Post } from '../../../shared/_models/post.interface';
import { PostForm } from '../../_models/post-from.inteface';
import hljs from 'highlight.js';

@Component({
  selector: 'blog-add-post',
  standalone: true,
  imports: [ReactiveFormsModule, FirestoreModule, AsyncPipe, FormsModule, EditorModule, QuillEditorComponent, HighlightModule],
  providers: [AdminApiService, NgModel],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostComponent {

  blogForm: FormGroup<PostForm>;

  private fb = inject(FormBuilder);
  private apiService = inject(AdminApiService);

  constructor() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      date: [null],
      description: [null]
    }) as FormGroup<PostForm>;
  }

  onSubmit(): void {
    this.highlightContent();
    if (this.blogForm.valid) {
      this.apiService.addPost(this.blogForm.value as Post);
    }
  }

  async initializeQuill() {
    await loadQuillModules();
  }


  highlightContent(): void {
    this.blogForm.controls.content.setValue(this.extractAndHighlight(this.blogForm.controls.content.value));
  }

  extractAndHighlight(htmlContent: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const codeBlocks = tempDiv.querySelectorAll('pre');
    codeBlocks.forEach((block) => {
      const language = block.getAttribute('data-language') || 'plaintext';
      const codeElement = document.createElement('code');
      codeElement.className = language;
      codeElement.innerHTML = hljs.highlight(block.textContent || '', { language }).value;
      block.innerHTML = '';
      block.appendChild(codeElement);
    });

    return tempDiv.innerHTML;
  }
}
