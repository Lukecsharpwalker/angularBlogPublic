import { Routes } from '@angular/router';
import { readerRoutes } from './reader/reader.routes';
import { authGuard } from './shared/_guards/auth.guard';

export const routes: Routes = [
  {
    path: 'posts',
    children: readerRoutes,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(r => r.adminRoutes),
    title: 'Admin',
    canActivate: [authGuard],
  },
  {
    path:'**',
    redirectTo: 'posts'
  },
];
