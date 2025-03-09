import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnInit,
  Signal,
  inject,
  runInInjectionContext,
  AfterViewInit,
  ViewContainerRef,
  afterNextRender,
} from '@angular/core';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Post } from '../../../../shared/_models/post.interface';
import { Observable, from, map } from 'rxjs';
import { CommentsComponent } from './comments/comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Comment } from '../../../../shared/_models/comment.inteface';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogService } from '../../../../shared/dynamic-dialog/dynamic-dialog.service';
import { CodeBlockModalComponent } from './code-block-modal-component/code-block-modal-component.component';
import { ModalStatus } from '../../../../shared/_models/modal-status.interface';

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
  //TODO: add resolver
  @Input() id!: string;

  apiService = inject(ReaderApiService);
  injector = inject(Injector);
  router = inject(Router);
  datePipe = inject(DatePipe);

  private dialogService = inject(DynamicDialogService);
  private sanitizer = inject(DomSanitizer);
  private viewContainerRef = inject(ViewContainerRef);

  post$!: Observable<Post | null>;
  comments$!: Signal<Comment[] | undefined>;
  date: string = '';

  ngOnInit() {
    this.post$ = from(this.apiService.getPost(this.id)).pipe(
      map((post: Post | null) => {
        if (post) {
          post.dateJS = post.date.toDate();
          this.date = this.datePipe.transform(
            post.dateJS,
            'dd-MM-yyyy',
          ) as string;
          post.content = this.sanitizer.bypassSecurityTrustHtml(
            post.content as string,
          );
        }
        return post;
      }),
    );
    this.comments$! = runInInjectionContext(this.injector, () =>
      toSignal(this.apiService.getComments(this.id)),
    );
  }

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
