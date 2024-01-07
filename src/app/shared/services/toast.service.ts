import { Injectable, inject } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

type OmittedKeys = 'severity' | 'detail' | 'closable';
type MessageOptions = Omit<Message, OmittedKeys>;

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly messageService = inject(MessageService);

  clear(): void {
    this.messageService.clear();
  }

  error(message: string, options?: MessageOptions): void {
    this.messageService.add({
      severity: 'error',
      detail: message,
      closable: true,
      ...options,
    });
  }

  warn(message: string, options?: MessageOptions): void {
    this.messageService.add({
      severity: 'warn',
      detail: message,
      closable: true,
      ...options,
    });
  }

  success(message: string, options?: MessageOptions): void {
    this.messageService.add({
      severity: 'success',
      detail: message,
      closable: true,
      ...options,
    });
  }

  info(message: string, options?: MessageOptions): void {
    this.messageService.add({
      severity: 'info',
      detail: message,
      closable: true,
      ...options,
    });
  }
}
