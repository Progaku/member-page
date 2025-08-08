import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@/internal/components/header/header.component';
import { StorageService } from '@/shared/services/storage.service';

@Component({
    selector: 'app-template',
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './template.component.html',
    styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnDestroy{
  private storageService = inject(StorageService);

  ngOnDestroy(): void {
    this.storageService.clear();
  }
}
