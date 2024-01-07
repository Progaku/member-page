import { Routes } from '@angular/router';

import { MemberDetailComponent } from '@/internal/member-detail/member-detail.component';
import { MemberListComponent } from '@/internal/member-list/member-list.component';
import { MypageComponent } from '@/internal/mypage/mypage.component';

export const routes: Routes = [
  {
    path: 'mypage',
    component: MypageComponent,
  },
  {
    path: 'members',
    component: MemberListComponent,
  },
  {
    path: 'members/:id',
    component: MemberDetailComponent,
  },
];
