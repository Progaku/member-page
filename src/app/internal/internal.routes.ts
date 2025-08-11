import { Routes } from '@angular/router';
import { MemberDetailComponent } from '@/internal/member-detail/member-detail.component';
import { MemberListComponent } from '@/internal/member-list/member-list.component';
import { MypageComponent } from '@/internal/mypage/mypage.component';
import { memberDetailResolver } from '@/internal/resolver/member-detail.resolver';
import { memberListResolver } from '@/internal/resolver/member-list.resolver';
import { isLoggedInGuard } from '@/shared/guards/is-logged-in.guard';

export const routes: Routes = [
  {
    path: 'mypage',
    canActivate: [isLoggedInGuard],
    component: MypageComponent,
  },
  {
    path: 'members',
    canActivate: [isLoggedInGuard],
    component: MemberListComponent,
    resolve: { memberList: memberListResolver },
  },
  {
    path: 'members/:id',
    canActivate: [isLoggedInGuard],
    component: MemberDetailComponent,
    resolve: { memberDetail: memberDetailResolver },
  },
];
