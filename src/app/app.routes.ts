import { Routes } from '@angular/router';

import { TemplateComponent } from '@/internal/template/template.component';
import { LoginComponent } from '@/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'internal',
    component: TemplateComponent,
    loadChildren: () =>
      import('./internal/internal.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
