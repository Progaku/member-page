import { Routes } from '@angular/router';

import { TemplateComponent as AdminTemplateComponent } from '@/admin-internal/template/template.component';
import { TemplateComponent } from '@/internal/template/template.component';
import { isAuthAdminGuard } from '@/shared/guards/is-auth-admin.guard';
import { isLoggedInGuard } from '@/shared/guards/is-logged-in.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes)
  },
  {
    path: 'admin-internal',
    component: AdminTemplateComponent,
    canActivate: [isAuthAdminGuard],
    loadChildren: () =>
      import('@/admin-internal/admin-internal.routes').then((m) => m.routes),
  },
  {
    path: 'internal',
    component: TemplateComponent,
    canActivate: [isLoggedInGuard],
    loadChildren: () =>
      import('./internal/internal.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
