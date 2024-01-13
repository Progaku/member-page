import { DatePipe } from '@angular/common';
import { Component, HostListener, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { filter, Subscription } from 'rxjs';

import { CloudStorageService } from '@/api/cloud-storage.service';
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
export class MemberCardComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private cloudStorageService = inject(CloudStorageService);
  /** チップ表示最大数 */
  private readonly DISPLAY_MAX_CHIP_COUNT = 3;

  @Input({ required: true }) memberInfo: Member = MemberInitial;

  /** チップ表示最大数を超えているかどうか */
  isOverTechsMaxCount = false;
  /** 表示テック */
  displayTechs: string[] = [];
  /** 画像パス */
  iconImagePath: string | null = null;

  /** 現在の画面幅 */
  currentWindowWidth = window.innerWidth;

  ngOnInit(): void {
    this.isOverTechsMaxCount = this.memberInfo.techs.length > this.DISPLAY_MAX_CHIP_COUNT;
    this.displayTechs = this.memberInfo.techs.slice(0, 3);
    if (this.memberInfo.iconImage) {
      this.subscription.add(
        this.cloudStorageService.getImageUri(this.memberInfo.iconImage).pipe(
          filter((item): item is string => item !== null)
        ).subscribe((path) => {
          this.iconImagePath = path;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
