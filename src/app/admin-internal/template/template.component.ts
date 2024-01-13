import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@/admin-internal/components/header/header.component';
import { FirebaseAuthenticationService } from '@/api/firebase-authentication.service';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnDestroy {
  private firebaseAuthenticationService = inject(FirebaseAuthenticationService);

  ngOnDestroy(): void {
    this.firebaseAuthenticationService.logout();
  }
}
