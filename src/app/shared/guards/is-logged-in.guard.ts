import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { FirebaseAuthenticationService } from '@/api/firebase-authentication.service';
import { StorageService } from '@/shared/services/storage.service';

export const isLoggedInGuard: CanActivateFn = (
  _route,
  _state,
  storageService = inject(StorageService),
  firebaseAuthenticationService = inject(FirebaseAuthenticationService),
  router = inject(Router),
) => {
  const userId = storageService.userId;
  const isAuth = firebaseAuthenticationService.isAuth();

  if (userId === null || !isAuth) {
    router.navigate(['/login']).then();
    return false;
  }

  return true;
};
