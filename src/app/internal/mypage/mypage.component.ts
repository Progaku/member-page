import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { FormLabelComponent } from '@/shared/components/atoms/form-label/form-label.component';
import { FormFieldComponent } from '@/shared/components/molecules/form-field/form-field.component';

@Component({
  selector: 'app-mypage',
  standalone: true,
  imports: [
    ImageModule,
    CardModule,
    ButtonModule,
    FormFieldComponent,
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    FormLabelComponent,
    InputTextareaModule,
    ChipsModule
  ],
  templateUrl: './mypage.component.html',
  styleUrl: './mypage.component.scss'
})
export class MypageComponent {
  private activatedRoute = inject(ActivatedRoute);

  /** アイコン */
  myIconPath = '';

  /** 都道府県最大文字数 */
  readonly prefecturesMaxLength = 30;

  /** ニックネーム */
  nicknameForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  /** X(twitter) */
  twitterUserIdForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.pattern(/^[A-Za-z0-9_]+$/)],
  });
  /** 誕生日 */
  birthdayForm = new FormControl<Date | null>(null, {
    nonNullable: false,
  });
  /** 都道府県 */
  prefecturesForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.maxLength(this.prefecturesMaxLength)],
  });
  /** 技術 */
  techChipForm = new FormControl<string[]>([], {
    nonNullable: true,
  });
  /** 参加理由 */
  participationReasonForm = new FormControl<string>('', {
    nonNullable: true,
  });
  /** 趣味 */
  hobbyForm = new FormControl<string[]>([], {
    nonNullable: true,
  });
  /** 自由記載 */
  descriptionForm = new FormControl<string>('', {
    nonNullable: true,
  });

  formGroup = new FormGroup({
    nickname: this.nicknameForm,
    twitterUserId: this.twitterUserIdForm,
    birthday: this.birthdayForm,
    prefectures: this.prefecturesForm,
    tech: this.techChipForm,
    participationReason: this.participationReasonForm,
    hobby: this.hobbyForm,
    description: this.descriptionForm,
  });

  /** アイコン設定ボタンの押下 */
  onClickIconSettingButton(): void {}
}
