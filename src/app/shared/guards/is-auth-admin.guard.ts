import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { FirebaseAuthenticationService } from '@/api/firebase-authentication.service';

export const isAuthAdminGuard: CanActivateFn = (
  _route,
  _state,
  firebaseAuthenticationService = inject(FirebaseAuthenticationService),
  router = inject(Router),
) => {
  const res = firebaseAuthenticationService.isAuth();
  if (!res) {
    router.navigate(['/login']).then();
  }
  return firebaseAuthenticationService.isAuth();
};
