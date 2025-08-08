import { Component, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { TABLET_THRESHOLD_WIDTH } from '@/shared/constants/breakpoint';
import { ToastService } from '@/shared/services/toast.service';

@Component({
    selector: 'app-header',
    imports: [ButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private toastService = inject(ToastService);
  private router = inject(Router);

  /** 現在の画面幅 */
  currentWindowWidth = signal(window.innerWidth);
  /** タブレットとの閾値 */
  readonly TABLET_THRESHOLD_WIDTH = TABLET_THRESHOLD_WIDTH;

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth.set(window.innerWidth);
  }

  /** メンバー一覧 */
  onClickMemberButton(): void {
    this.router.navigate(['/internal/members']).then();
  }

  /** マイページ */
  onClickMyPageButton(): void {
    this.router.navigate(['/internal/mypage']).then();
  }

  /** ログアウト */
  onClickLogoutButton(): void {
    this.toastService.success('ログアウトしました');
    this.router.navigate(['/login']).then();
  }
}
