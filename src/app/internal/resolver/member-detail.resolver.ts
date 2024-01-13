import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { FirestoreService, MemberDetail } from '@/api/firestore.service';

export const memberDetailResolver: ResolveFn<MemberDetail | null> = (
  route,
  _state,
  firestoreService = inject(FirestoreService)
) => {
  return firestoreService.getMemberById(route.params['id']);
};
