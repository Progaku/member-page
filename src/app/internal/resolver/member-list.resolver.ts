import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { FirestoreService, Member } from '@/api/firestore.service';

export const memberListResolver: ResolveFn<Member[]> = (
  _route,
  _state,
  firestoreService: FirestoreService = inject(FirestoreService),
) => {
  return firestoreService.getMembers();
};
