import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';

import { ItemListComponent } from '@/internal/components/item-list/item-list.component';
import { TABLET_THRESHOLD_WIDTH } from '@/shared/constants/breakpoint';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
    ItemListComponent,
    ChipModule,
    ImageModule,
    CardModule
  ],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent {
  private activatedRoute = inject(ActivatedRoute);

  memberDetail = {};

  /** 現在の画面幅 */
  currentWindowWidth = window.innerWidth;

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
