import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Subscription } from 'rxjs';

import { FirestoreService } from '@/api/firestore.service';
import { FormErrorComponent } from '@/shared/components/atoms/form-error/form-error.component';
import { FormLabelComponent } from '@/shared/components/atoms/form-label/form-label.component';
import { FormFieldComponent } from '@/shared/components/molecules/form-field/form-field.component';

@Component({
    selector: 'app-register-user',
    imports: [
        ButtonModule,
        CalendarModule,
        CardModule,
        ChipsModule,
        FormErrorComponent,
        FormFieldComponent,
        FormLabelComponent,
        FormsModule,
        ImageModule,
        InputTextModule,
        InputTextareaModule,
        ReactiveFormsModule
    ],
    templateUrl: './register-user.component.html',
    styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent implements OnDestroy {
  private subscription = new Subscription();
  private firestoreService = inject(FirestoreService);

  /** 合言葉 */
  userIdForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_-]+$/)
    ],
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
      })
    );
  }
}
