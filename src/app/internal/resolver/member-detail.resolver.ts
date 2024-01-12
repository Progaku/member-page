import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { FirestoreService, MemberDetail } from '@/api/firestore.service';

export const memberDetailResolver: ResolveFn<MemberDetail> = (
  route,
  _state,
  firestoreService: FirestoreService = inject(FirestoreService),
) => {
  return firestoreService.getMemberDetail(route.params['id']);
};
