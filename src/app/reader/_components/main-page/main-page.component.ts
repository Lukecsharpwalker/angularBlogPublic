import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReaderApiService } from '../../_services/reader-api.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FirestoreModule, AsyncPipe, RouterLink],
  providers: [ReaderApiService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  apiService = inject(ReaderApiService);
  blog$ = this.apiService.blog$;
}
