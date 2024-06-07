import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { ReaderApiService } from '../../../_services/reader-api.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Blog } from '../../../../shared/_models/blog.interface';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  providers: [ReaderApiService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit{
  @Input() id!: string;

  cdr = inject(ChangeDetectorRef);
  apiService = inject(ReaderApiService);

  post$!: Observable<Blog | null>;

  ngOnInit() {
     this.post$ = from(this.apiService.getPost(this.id));
  }

}
