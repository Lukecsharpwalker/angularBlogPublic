import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  ViewContainerRef,
  afterNextRender,
  Signal,
  input,
} from '@angular/core';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { Router } from '@angular/router';
import { DynamicDialogService } from '../../../../shared/dynamic-dialog/dynamic-dialog.service';
import { CodeBlockModalComponent } from './code-block-modal-component/code-block-modal-component.component';
import { PostStore } from './post.store';
import { CommentsStore } from './comments/comments.store';
import { Post } from '../../../../types/supabase';

@Component({
  selector: 'app-post',
  standalone: true,
  providers: [ReaderApiService, DatePipe, PostStore, CommentsStore],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommentsComponent, AddCommentComponent, DatePipe],
})
export class PostComponent implements OnInit {
  id = input.required<string>();

  router = inject(Router);
  postStore = inject(PostStore);

  post: Signal<Post | null> = this.postStore.post;
  date: string = '';

  private dialogService = inject(DynamicDialogService);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    this.addEventsForOpenModalWithCode();
  }

  ngOnInit() {
    this.loadPost();
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

  private loadPost(): void {
    this.postStore.getPost(this.id());
  }

  private showCodeModal(event: Event) {
    const preElement = event.currentTarget as HTMLElement;
    const codeElement = preElement.querySelector('code');
    const code = codeElement?.innerHTML || '';
    const language = preElement.getAttribute('data-language') || '';

    this.dialogService.openDialog(
      this.viewContainerRef,
      {
        title: `${language.toUpperCase()} Code`,
        content: '',
        primaryButton: 'Close',
        data: { code, language },
      },
      CodeBlockModalComponent,
    );
  }

  private addEventsForOpenModalWithCode() {
    afterNextRender(() => {
      //TODO: Move to the service
      const processedNodes = new Set<Node>();

      const observer = new MutationObserver((mutations) => {
        let found = false;

        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (processedNodes.has(node)) {
              return;
            }
            processedNodes.add(node);

            if (node instanceof HTMLElement) {
              const preElements = node.querySelectorAll('pre[data-language]');
              if (preElements.length > 0) {
                found = true;
                preElements.forEach((pre) => {
                  pre.classList.add(
                    'cursor-pointer',
                    'hover:opacity-80',
                    'transition-opacity',
                  );
                  pre.addEventListener('click', (e) => this.showCodeModal(e));
                });
              }
            }
          });
        });

        if (found) {
          observer.disconnect();
          processedNodes.clear();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }
}
