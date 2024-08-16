import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnInit, Signal, inject, runInInjectionContext } from '@angular/core';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { Post } from '../../../../shared/_models/post.interface';
import { Observable, from, map } from 'rxjs';
import { CommentsComponent } from "./comments/comments.component";
import { AddCommentComponent } from './add-comment/add-comment.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Comment } from '../../../../shared/_models/comment.inteface';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { cp } from 'node:fs';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-post',
  standalone: true,
  providers: [ReaderApiService, DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, JsonPipe, CommentsComponent, AddCommentComponent, NgIf, DatePipe],
})
export class PostComponent implements OnInit {
  @Input() id!: string;

  apiService = inject(ReaderApiService);
  injector = inject(Injector);
  router = inject(Router);
  datePipe = inject(DatePipe);
  cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);

  private sanitizer = inject(DomSanitizer);

  post$!: Observable<Post | null>;
  comments$!: Signal<Comment[] | undefined>;
  date: string = '';
  constructor() { 
    
  }

  ngOnInit() {
    this.post$ = from(this.apiService.getPost(this.id))
      .pipe(
        map((post: Post | null) => {
          if (post) {
            post.dateJS = post.date.toDate();
            this.date = this.datePipe.transform(post.dateJS, 'dd-MM-yyyy') as string;
            console.log(this.date)
            post.content = this.sanitizer.bypassSecurityTrustHtml(post.content as string);
          }
          return post;
        })
      );
    this.comments$! = runInInjectionContext(this.injector, () => toSignal(this.apiService.getComments(this.id)));
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

}
