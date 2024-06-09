import { Routes } from '@angular/router';
import { readerRoutes } from './reader/reader.routes';
import { adminRoutes } from './admin/admin.routes';
import { MainPageComponent } from './reader/_components/main-page/main-page.component';

export const routes: Routes = [
  {
    path: 'posts',
    children: readerRoutes,
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(r => r.adminRoutes),
    title: 'Admin',
  },
];
