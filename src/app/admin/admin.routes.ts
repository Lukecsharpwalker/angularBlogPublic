import { Routes } from '@angular/router';
import { AddPostComponent } from './_components/add-post/add-post.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AddPostComponent,
  },
];
