import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Subscription } from 'rxjs';
import { FirebaseAuthenticationService } from '@/api/firebase-authentication.service';
import { FormErrorComponent } from '@/shared/components/atoms/form-error/form-error.component';
import { FormLabelComponent } from '@/shared/components/atoms/form-label/form-label.component';
import { FormFieldComponent } from '@/shared/components/molecules/form-field/form-field.component';
import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'app-admin-login',
  imports: [
    ButtonModule,
    CardModule,
    FormErrorComponent,
    FormFieldComponent,
    FormLabelComponent,
    PasswordModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent implements OnDestroy {
  private subscription = new Subscription();
  private router = inject(Router);
  private toastService = inject(ToastService);
  private firebaseAuthenticationService = inject(FirebaseAuthenticationService);

  idForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  passwordForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  formGroup = new FormGroup({
    id: this.idForm,
    password: this.passwordForm,
  });

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickAdminLogin(): void {
    this.subscription.add(
      this.firebaseAuthenticationService.login(this.idForm.value, this.passwordForm.value).subscribe({
        next: () => {
          this.toastService.info('admin login');
          this.router.navigate(['/admin-internal/register']).then();
        },
        error: () => {
          this.toastService.error('failed login');
        },
      }),
    );
  }

  onClickNormalLogin(): void {
    this.router.navigate(['/login']).then();
  }
}
