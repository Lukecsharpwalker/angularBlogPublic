import { ChangeDetectionStrategy, Component, Injector, Input, OnInit, Signal, inject, runInInjectionContext } from '@angular/core';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { Post } from '../../../../shared/_models/post.interface';
import { Observable, from } from 'rxjs';
import { CommentsComponent } from "./comments/comments.component";
import { AddCommentComponent } from './add-comment/add-comment.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-post',
    standalone: true,
    providers: [ReaderApiService],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, JsonPipe, CommentsComponent, AddCommentComponent, NgIf, DatePipe]
})
export class PostComponent implements OnInit{
  @Input() id!: string;

  apiService = inject(ReaderApiService);
  injector = inject(Injector);

  post$!: Observable<Post | null>;
  comments$!: Signal<Comment[] | undefined>;

  ngOnInit() {
     this.post$ = from(this.apiService.getPost(this.id));
     this.comments$! = runInInjectionContext(this.injector, () => toSignal(this.apiService.getComments(this.id)));
  }
}
