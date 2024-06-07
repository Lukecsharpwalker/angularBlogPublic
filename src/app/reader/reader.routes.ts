import { Routes } from '@angular/router';
import { MainPageComponent } from './_components/main-page/main-page.component';
import { PostComponent } from './_components/main-page/post/post.component';

export const readerRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'post/:id',
    component: PostComponent,
    pathMatch: 'full'
  }

];
