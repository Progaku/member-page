import { DatePipe } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';

import { MemberDetail, MemberDetailInitial } from '@/api/firestore.service';
import { ItemListComponent } from '@/internal/components/item-list/item-list.component';
import { TABLET_THRESHOLD_WIDTH } from '@/shared/constants/breakpoint';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
    ItemListComponent,
    ChipModule,
    ImageModule,
    CardModule,
    DatePipe
  ],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  memberDetail: MemberDetail = MemberDetailInitial;

  /** 現在の画面幅 */
  currentWindowWidth = window.innerWidth;

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data;
    this.memberDetail = resolverData['memberDetail'];
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  get imageWidth(): string {
    if (this.currentWindowWidth > TABLET_THRESHOLD_WIDTH) {
      return '400';
    } else {
      return '250';
    }
  }
}
