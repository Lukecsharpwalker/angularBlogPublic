import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminApiService } from '../../_services/admin-api.service';
import { FirestoreModule, Timestamp } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { EditorModule } from 'primeng/editor';
import { HighlightModule } from 'ngx-highlightjs';
import { QuillEditorComponent } from 'ngx-quill'
import { Post } from '../../../shared/_models/post.interface';
import { PostForm } from '../../_models/post-from.inteface';
import hljs from 'highlight.js';
import { RouterModule } from '@angular/router';
import { loadQuillModules } from '../../../utlis/quill-configuration';

@Component({
  selector: 'blog-add-post',
  standalone: true,
  imports: [ReactiveFormsModule, FirestoreModule, AsyncPipe, FormsModule, EditorModule, QuillEditorComponent, HighlightModule, RouterModule],
  providers: [AdminApiService, NgModel],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostComponent implements OnInit {
  @Input() postId?: string;

  blogForm: FormGroup<PostForm>;

  viewContainerRef = inject(ViewContainerRef);

  private fb = inject(FormBuilder);
  private apiService = inject(AdminApiService);

  constructor() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      date: new Timestamp(0, 0),
      description: [null],
      isDraft: [false],
    }) as FormGroup<PostForm>;
    
  }


  ngOnInit(): void {
    if (this.postId) {
      this.apiService.getPostById(this.postId).subscribe((post) => {
        if (post) {
          this.blogForm.patchValue(post);
        }
      });
    }
    this.initializeQuill();
  }
  async initializeQuill() {
    await loadQuillModules();
  }

  onSubmit(isDraft = false): void {
    this.highlightContent();
    if (this.blogForm.valid) {
      this.blogForm.controls.isDraft.setValue(isDraft);
      if (!this.blogForm.controls.date.value) {
        this.blogForm.controls.date.setValue(Timestamp.fromDate(new Date()));
      }
      if (this.postId) {
        this.apiService.updatePost(this.postId, this.blogForm.value as Post);
      } else {
        this.apiService.addPost(this.blogForm.value as Post);
      }
    }
  }

  highlightContent(): void {
    this.blogForm.controls.content.setValue(this.extractAndHighlight(this.blogForm.controls.content.value as string));
  }

  extractAndHighlight(htmlContent: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const codeBlocks = tempDiv.querySelectorAll('pre');
    codeBlocks.forEach((block) => {
      let language = block.getAttribute('data-language') || 'plaintext';
      const codeElement = document.createElement('code');
      codeElement.className = language;
      if (language === 'plain') {
        language = 'plaintext';
      }
      codeElement.innerHTML = hljs.highlight(block.textContent || '', { language }).value;
      block.innerHTML = '';
      block.appendChild(codeElement);
    });

    return tempDiv.innerHTML;
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
  }
}
