import { Routes } from '@angular/router';
import { readerRoutes } from './reader/reader.routes';
import { adminRoutes } from './admin/admin.routes';

export const routes: Routes = [
  {
    path: '',
    children: readerRoutes,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(r => r.adminRoutes),
    title: 'Admin',
  },
];
