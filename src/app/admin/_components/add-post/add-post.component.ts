import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  inject,
  Input,
  OnInit,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminApiService } from '../../_services/admin-api.service';
import { HighlightModule } from 'ngx-highlightjs';
import { QuillEditorComponent, Range } from 'ngx-quill';
import { PostForm } from '../../_models/post-from.inteface';
import hljs from 'highlight.js';
import { RouterModule } from '@angular/router';
import { loadQuillModules } from '../../../utlis/quill-configuration';
import { DynamicDialogService } from '../../../shared/dynamic-dialog/dynamic-dialog.service';
import { ModalConfig } from '../../../shared/_models/modal-config.intreface';
import { AddImageComponent } from './add-image/add-image.component';
import { AddImageForm } from './add-image/add-image-controls.interface';
import { Post } from '../../../types/supabase';

@Component({
  selector: 'blog-add-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    QuillEditorComponent,
    HighlightModule,
    RouterModule,
  ],
  providers: [AdminApiService, NgModel],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPostComponent implements OnInit {
  @Input() postId?: string;
  quill = viewChild.required<QuillEditorComponent>('quill');

  viewContainerRef = inject(ViewContainerRef);
  dialogService = inject(DynamicDialogService<AddImageForm>);

  blogForm: FormGroup<PostForm> = new FormGroup<PostForm>({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    content: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    date: new FormControl<Date | null>(null),
    description: new FormControl<string | null>(null),
    isDraft: new FormControl(false, { nonNullable: true }),
  });
  range: Range | null = null;

  private apiService = inject(AdminApiService);

  ngOnInit(): void {
    this.loadPostIfIdExists();
    this.initializeQuill();
  }

  private loadPostIfIdExists(): void {
    if (this.postId) {
      this.apiService.getPostById(this.postId).subscribe((post) => {
        if (post) {
          this.blogForm.patchValue(post);
        }
      });
    }
  }

  async initializeQuill() {
    await loadQuillModules();
  }

  onSubmit(isDraft = false): void {
    this.highlightContent();
    if (this.blogForm.valid) {
      const rawContent = this.blogForm.controls.content.value as string;
      const cleanedContent = rawContent.replace(/(&nbsp;|\u00A0)/g, ' ');
      this.blogForm.controls.content.setValue(cleanedContent);
      this.blogForm.controls.isDraft.setValue(isDraft);
      if (!this.blogForm.controls.date.value) {
        this.blogForm.controls.date.setValue(null);
      }
      if (this.postId) {
        this.apiService.updatePost(this.postId, this.blogForm.value as Post);
      } else {
        this.apiService.addPost(this.blogForm.value as Post);
      }
    }
  }

  highlightContent(): void {
    this.blogForm.controls.content.setValue(
      this.extractAndHighlightHTML(
        this.blogForm.controls.content.value as string,
      ),
    );
    this.blogForm.controls.content.setValue(
      this.extractAndHighlightTS(
        this.blogForm.controls.content.value as string,
      ),
    );
  }

  extractAndHighlightHTML(htmlContent: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const codeBlocksHTML = tempDiv.querySelectorAll('pre[data-language="xml"]');
    codeBlocksHTML.forEach((block) => {
      let language = 'xml';
      const codeElement = document.createElement('code');
      codeElement.className = language;
      codeElement.innerHTML = hljs.highlight(block.textContent || '', {
        language,
      }).value;
      block.innerHTML = '';
      block.appendChild(codeElement);
    });

    return tempDiv.innerHTML;
  }

  extractAndHighlightTS(htmlContent: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const codeBlocksTS = tempDiv.querySelectorAll(
      'pre[data-language="typescript"]',
    );
    codeBlocksTS.forEach((block) => {
      let language = 'typescript';
      const codeElement = document.createElement('code');
      codeElement.className = language;
      codeElement.innerHTML = hljs.highlight(block.textContent || '', {
        language,
      }).value;
      block.innerHTML = '';
      block.appendChild(codeElement);
    });

    return tempDiv.innerHTML;
  }

  // Function to insert an image into Quill editor
  insertImage() {
    const modalConfig: ModalConfig = {
      title: 'Add Image',
      primaryButton: 'Insert',
      secondaryButton: 'Cancel',
    };
    this.range = this.quill().quillEditor.getSelection();
    this.dialogService
      .openDialog<AddImageComponent>(
        this.viewContainerRef,
        modalConfig,
        AddImageComponent,
      )
      .subscribe((modalStatus) => {
        if (modalStatus.data) {
          const imgTag = `<img src="${modalStatus.data.form.controls.src.value}" alt="${modalStatus.data.form.controls.alt.value}" style="max-width: 100%;">`;
          if (this.range) {
            const newValue = this.insertString(
              this.blogForm.controls.content.value as string,
              this.blogForm.controls.content.value.toString().length,
              imgTag,
            );
            this.blogForm.controls.content.setValue(newValue);
          }
        }
      });
  }

  insertString(
    originalString: string,
    index: number,
    stringToInsert: string,
  ): string {
    const result = [
      ...originalString.slice(0, index),
      ...stringToInsert,
      ...originalString.slice(index),
    ].join('');
    return result;
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
  }
}
