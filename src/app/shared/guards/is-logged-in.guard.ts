import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';

import { FirestoreService } from '@/api/firestore.service';
import { StorageService } from '@/shared/services/storage.service';

export const isLoggedInGuard: CanActivateFn = (
  _route,
  _state,
  storageService = inject(StorageService),
  firestoreService: FirestoreService = inject(FirestoreService),
  router = inject(Router),
) => {
  const userId = storageService.userId;

  if (userId === null) {
    router.navigate(['/login']).then();
    return false;
  }

  return firestoreService.isExistMemberById(userId).pipe(
    tap((param) => {
      if (!param) {
        router.navigate(['/login']).then();
      }
    })
  );
};
