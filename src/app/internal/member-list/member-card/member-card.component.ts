import { DatePipe } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
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
export class MemberCardComponent implements OnInit{
  /** チップ表示最大数 */
  private readonly DISPLAY_MAX_CHIP_COUNT = 3;

  @Input({ required: true }) memberInfo: Member = MemberInitial;

  /** チップ表示最大数を超えているかどうか */
  isOverTechsMaxCount = false;
  /** 表示テック */
  displayTechs: string[] = [];

  /** 現在の画面幅 */
  currentWindowWidth = window.innerWidth;

  ngOnInit(): void {
    this.isOverTechsMaxCount = this.memberInfo.techs.length > this.DISPLAY_MAX_CHIP_COUNT;
    this.displayTechs = this.memberInfo.techs.slice(0, 3);
  }

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
