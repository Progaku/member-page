import { DatePipe } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';

import { Member, MemberInitial } from '@/api/firestore.service';
import { ItemListComponent } from '@/internal/components/item-list/item-list.component';
import { TABLET_THRESHOLD_WIDTH } from '@/shared/constants/breakpoint';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [
    ImageModule,
    ItemListComponent,
    ChipModule,
    CardModule,
    DatePipe
  ],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  @Input({ required: true }) memberInfo: Member = MemberInitial;

  /** 現在の画面幅 */
  currentWindowWidth = window.innerWidth;

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  get imageWidth(): string {
    if (this.currentWindowWidth > TABLET_THRESHOLD_WIDTH) {
      return '250';
    } else {
      return '150';
    }
  }
}
