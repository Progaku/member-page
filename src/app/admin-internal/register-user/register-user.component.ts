import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { FirestoreService } from '@/api/firestore.service';
import { FormErrorComponent } from '@/shared/components/atoms/form-error/form-error.component';
import { FormLabelComponent } from '@/shared/components/atoms/form-label/form-label.component';
import { FormFieldComponent } from '@/shared/components/molecules/form-field/form-field.component';

@Component({
  selector: 'app-register-user',
  imports: [
    ButtonModule,
    CardModule,
    FormErrorComponent,
    FormFieldComponent,
    FormLabelComponent,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
})
export class RegisterUserComponent implements OnDestroy {
  private subscription = new Subscription();
  private firestoreService = inject(FirestoreService);

  /** 合言葉 */
  userIdForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]+$/)],
  });

  /** ニックネーム */
  nicknameForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  formGroup = new FormGroup({
    memberId: this.userIdForm,
    nickname: this.nicknameForm,
  });

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickRegisterButton(): void {
    this.subscription.add(
      this.firestoreService.registerUser(this.formGroup.getRawValue()).subscribe(() => {
        this.userIdForm.setValue('');
        this.nicknameForm.setValue('');
      }),
    );
  }
}
