import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { concat, concatMap, forkJoin, map, Observable, of, Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { CloudStorageService } from '@/api/cloud-storage.service';
import { FirestoreService, MemberDetail } from '@/api/firestore.service';
import { FormErrorComponent } from '@/shared/components/atoms/form-error/form-error.component';
import { FormLabelComponent } from '@/shared/components/atoms/form-label/form-label.component';
import { FormFieldComponent } from '@/shared/components/molecules/form-field/form-field.component';
import { TABLET_THRESHOLD_WIDTH } from '@/shared/constants/breakpoint';
import { StorageService } from '@/shared/services/storage.service';
import { ToastService } from '@/shared/services/toast.service';

@Component({
    selector: 'app-mypage',
    imports: [
        ImageModule,
        CardModule,
        ButtonModule,
        FormFieldComponent,
        InputTextModule,
        ReactiveFormsModule,
        CalendarModule,
        FormLabelComponent,
        FormErrorComponent,
        InputTextareaModule,
        ChipsModule,
        FileUploadModule
    ],
    templateUrl: './mypage.component.html',
    styleUrl: './mypage.component.scss'
})
export class MypageComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private router = inject(Router);
  private toastService = inject(ToastService);
  private storageService = inject(StorageService);
  private firestoreService = inject(FirestoreService);
  private cloudStorageService = inject(CloudStorageService);

  /** アイコン */
  myIconPath: string | null = null;

  /** 現在の画像ID */
  currentImageId: string | null = null;

  /** 現在の画面幅 */
  currentWindowWidth = window.innerWidth;

  /** 都道府県最大文字数 */
  readonly prefecturesMaxLength = 30;

  /** ニックネーム */
  nicknameForm = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  /** X(twitter) */
  twitterUserIdForm = new FormControl<string | null>(null, {
    nonNullable: false,
    validators: [Validators.pattern(/^[A-Za-z0-9_]+$/)],
  });
  /** 誕生日 */
  birthdayForm = new FormControl<string | null>(null, {
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
    techs: this.techChipForm,
    participationReason: this.participationReasonForm,
    hobby: this.hobbyForm,
    description: this.descriptionForm,
  });

  /** 画像幅 */
  get imageWidth(): string {
    if (this.currentWindowWidth > TABLET_THRESHOLD_WIDTH) {
      return '400';
    } else {
      return '250';
    }
  }

  ngOnInit(): void {
    this.subscription.add(
      this.firestoreService.getMemberById(this.storageService.userId!).pipe(
        concatMap((param): Observable<[MemberDetail | null, string | null] > => {
          if (!param?.iconImage) {
            return of([param, null]);
          }
          return this.cloudStorageService.getImageUri(param.iconImage).pipe(
            map((path)=> [param, path])
          );
        })
      ).subscribe(([param, path]) => {
        if (!param) {
          this.toastService.error('failed get my info');
          this.router.navigate(['/login']).then();
          return;
        }
        this.formBuilder(param);
        this.currentImageId = param.iconImage;
        this.myIconPath = path;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  /** アイコン設定ボタンの押下 */
  onClickIconSettingButton(event: Event): void {
    const target = event.target as HTMLInputElement;
    const reader = new FileReader();
    reader.addEventListener('load', e => {
      if (!e.target?.result) {
        return;
      }
      const uuid = uuidv4();
      const base64String = e.target.result.toString().split(',')[1];
      this.subscription.add(
        forkJoin([
          this.firestoreService.uploadMyIcon(this.storageService.userId!, uuid),
          this.cloudStorageService.setStorage(uuid, base64String)
        ]).pipe(
          concatMap(() => {
            if (this.currentImageId) {
              return concat(this.cloudStorageService.deleteStorage(this.currentImageId));
            }
            return of(null);
          })
        ).subscribe(() => {
          this.toastService.info('update success!');
          this.router.navigate(['/internal/members']).then();
        })
      );
    });
    reader.readAsDataURL(target.files![0]);
  }

  /** プロフィール設定ボタンの押下 */
  onClickProfileSettingButton(): void {
    this.subscription.add(
      this.firestoreService.updateMyInfo(this.storageService.userId!, {
        nickname: this.nicknameForm.value,
        twitterUserId: this.twitterUserIdForm.value,
        birthday: this.birthdayForm.value && format(this.birthdayForm.value, 'yyyy/MM/dd'),
        prefectures: this.prefecturesForm.value,
        techs: this.techChipForm.value,
        participationReason: this.participationReasonForm.value,
        hobby: this.hobbyForm.value,
        description: this.descriptionForm.value,
      }).subscribe(() => {
        this.toastService.info('update success!');
        this.router.navigate(['/internal/members']).then();
      })
    );
  }

  /** フォームビルダー */
  private formBuilder(myDetail: MemberDetail): void {
    this.nicknameForm.setValue(myDetail.nickname);
    this.twitterUserIdForm.setValue(myDetail.twitterUserId);
    this.birthdayForm.setValue(myDetail.birthday);
    this.prefecturesForm.setValue(myDetail.prefectures);
    this.techChipForm.setValue(myDetail.techs);
    this.participationReasonForm.setValue(myDetail.participationReason);
    this.hobbyForm.setValue(myDetail.hobby);
    this.descriptionForm.setValue(myDetail.description);
  }
}
