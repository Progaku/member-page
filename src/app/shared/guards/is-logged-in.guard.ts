import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@/shared/services/storage.service';

export const isLoggedInGuard: CanActivateFn = (
  _route,
  _state,
  storageService = inject(StorageService),
  router = inject(Router),
) => {
  const userId = storageService.userId;

  if (userId === null) {
    router.navigate(['/login']).then();
    return false;
  }

  return true;
};
