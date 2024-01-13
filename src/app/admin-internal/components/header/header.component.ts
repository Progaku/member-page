import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private toastService = inject(ToastService);
  private router = inject(Router);

  /** ログアウト */
  onClickLogoutButton(): void {
    this.toastService.success('ログアウトしました');
    this.router.navigate(['/login']).then();
  }
}
