import { Routes } from '@angular/router';
import { readerRoutes } from './reader/reader.routes';
import { authGuard } from './auth/_guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
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
