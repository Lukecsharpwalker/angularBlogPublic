import { Routes } from '@angular/router';
import { ReaderComponent } from './reader/reader.component';

export const routes: Routes = [
  {
    path: '',
    component: ReaderComponent,
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    title: 'Admin',
  },
];
