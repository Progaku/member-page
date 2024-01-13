import { Routes } from '@angular/router';

import { RegisterUserComponent } from '@/admin-internal/register-user/register-user.component';
import { isAuthAdminGuard } from '@/shared/guards/is-auth-admin.guard';

export const routes: Routes = [
  {
    path: 'register',
    canActivate: [isAuthAdminGuard],
    component: RegisterUserComponent,
  },
];
