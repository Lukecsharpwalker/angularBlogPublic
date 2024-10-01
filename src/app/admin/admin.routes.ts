import { Routes } from '@angular/router';
import { AddPostComponent } from './_components/add-post/add-post.component';
import { unsavedChangesGuard } from './_guards/unsaved-changes.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AddPostComponent,
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: ':postId',
    component: AddPostComponent,
    canDeactivate: [unsavedChangesGuard],
  },
];
