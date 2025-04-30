import { Routes } from '@angular/router';
import { readerRoutes } from './reader/reader.routes';
import { authAdminGuard } from './auth/_guards/authAdminGuard';

export const routes: Routes = [
  {
    path: '',
    children: readerRoutes,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((r) => r.adminRoutes),
    title: 'Admin',
    canActivate: [authAdminGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
