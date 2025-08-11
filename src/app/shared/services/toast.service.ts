import { Injectable, inject } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageService = inject(MessageService);

  clear(): void {
    this.messageService.clear();
  }

  error(message: string, options?: ToastMessageOptions): void {
    this.messageService.add({
      severity: 'error',
      detail: message,
      closable: true,
      ...options,
    });
  }

  warn(message: string, options?: ToastMessageOptions): void {
    this.messageService.add({
      severity: 'warn',
      detail: message,
      closable: true,
      ...options,
    });
  }

  success(message: string, options?: ToastMessageOptions): void {
    this.messageService.add({
      severity: 'success',
      detail: message,
      closable: true,
      ...options,
    });
  }

  info(message: string, options?: ToastMessageOptions): void {
    this.messageService.add({
      severity: 'info',
      detail: message,
      closable: true,
      ...options,
    });
  }
}
