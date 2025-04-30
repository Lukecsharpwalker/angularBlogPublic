import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnInit,
  inject,
  AfterViewInit,
  ViewContainerRef,
  afterNextRender,
} from '@angular/core';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogService } from '../../../../shared/dynamic-dialog/dynamic-dialog.service';
import { CodeBlockModalComponent } from './code-block-modal-component/code-block-modal-component.component';

@Component({
  selector: 'app-post',
  standalone: true,
  providers: [ReaderApiService, DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, CommentsComponent, AddCommentComponent, DatePipe],
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input() id!: string;

  apiService = inject(ReaderApiService);
  injector = inject(Injector);
  router = inject(Router);
  datePipe = inject(DatePipe);

  private dialogService = inject(DynamicDialogService);
  private sanitizer = inject(DomSanitizer);
  private viewContainerRef = inject(ViewContainerRef);

  date: string = '';

  ngOnInit() {}

  constructor() {
    afterNextRender(() => {
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

  ngAfterViewInit() {}

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

  goBack(): void {
    this.router.navigate(['/posts']);
  }
}
