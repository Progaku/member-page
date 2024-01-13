import { DatePipe } from '@angular/common';
import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { filter, Subscription } from 'rxjs';

import { CloudStorageService } from '@/api/cloud-storage.service';
import { MemberDetail, MemberDetailInitial } from '@/api/firestore.service';
import { ItemListComponent } from '@/internal/components/item-list/item-list.component';
import { TABLET_THRESHOLD_WIDTH } from '@/shared/constants/breakpoint';
import { ToastService } from '@/shared/services/toast.service';

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
export class MemberDetailComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private cloudStorageService = inject(CloudStorageService);

  /** 詳細 */
  memberDetail: MemberDetail = MemberDetailInitial;

  /** 画像パス */
  iconImagePath: string | null = null;

  /** 現在の画面幅 */
  currentWindowWidth = window.innerWidth;

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data;
    const memberDetail = resolverData['memberDetail'];
    if (!memberDetail) {
      this.toastService.error('failed get member detail');
      this.router.navigate(['/internal/members']).then();
      return;
    }
    this.memberDetail = memberDetail;
    if (memberDetail.iconImage) {
      this.subscription.add(
        this.cloudStorageService.getImageUri(memberDetail.iconImage).pipe(
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

  /** 画像幅 */
  get imageWidth(): string {
    if (this.currentWindowWidth > TABLET_THRESHOLD_WIDTH) {
      return '400';
    } else {
      return '250';
    }
  }
}
