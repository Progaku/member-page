import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MemberCardComponent } from '@/internal/member-list/member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    MemberCardComponent
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  members = [];

  toMemberDetail(id: number): void {
    this.router.navigate([`/internal/members/${id}`]).then();
  }
}
