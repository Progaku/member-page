import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';

import { FirestoreService } from '@/api/firestore.service';
import { FormErrorComponent } from '@/shared/components/atoms/form-error/form-error.component';
import { FormLabelComponent } from '@/shared/components/atoms/form-label/form-label.component';
import { FormFieldComponent } from '@/shared/components/molecules/form-field/form-field.component';
import { StorageService } from '@/shared/services/storage.service';
import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    FormFieldComponent,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FormLabelComponent,
    FormErrorComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private subscription = new Subscription();
  private router = inject(Router);
  private toastService = inject(ToastService);
  private storageService = inject(StorageService);
  private firestoreService = inject(FirestoreService);

  memberIdForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickLogin(): void {
    this.subscription.add(
      this.firestoreService.getMemberByMemberId(this.memberIdForm.value).subscribe((item) => {
        if (item) {
          this.storageService.setUserId(item.id);
          this.toastService.info('login');
          this.router.navigate(['/internal/mypage']).then();
        } else {
          this.toastService.error('failed login');
        }
      })
    );
  }

  onClickAdminLogin(): void {
    this.router.navigate(['/login/admin']).then();
  }
}
