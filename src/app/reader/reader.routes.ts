import { Routes } from '@angular/router';
import { MainPageComponent } from './_components/main-page/main-page.component';
import { PostComponent } from './_components/main-page/post/post.component';
import { PostsListComponent } from './_components/main-page/posts-list/posts-list.component';

export const readerRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: PostsListComponent
      },
      {
      path: 'details/:id/:index',
      component: PostComponent,
      pathMatch: 'full',
    }]
  }
];
