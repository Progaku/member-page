import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';

import { FormLabelComponent } from '@/shared/components/atoms/form-label/form-label.component';
import { FormFieldComponent } from '@/shared/components/molecules/form-field/form-field.component';
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
    FormLabelComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private subscription = new Subscription();
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);

  userIdForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  formGroup = new FormGroup({
    userId: this.userIdForm,
  });

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickLogin(): void {
    this.toastService.info('login');
    this.router.navigate(['/internal/mypage']).then();
  }
}
