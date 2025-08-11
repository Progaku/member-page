import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@/api/firestore.service';
import { MemberCardComponent } from '@/internal/member-list/member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  members = signal<Member[]>([]);

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data;
    this.members.set(resolverData['memberList']);
  }

  toMemberDetail(id: string): void {
    this.router.navigate([`/internal/members/${id}`]).then();
  }
}
