import { Routes } from '@angular/router';
import { AdminLoginComponent } from '@/auth/admin-login/admin-login.component';
import { LoginComponent } from '@/auth/login/login.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLoginComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  },
];
