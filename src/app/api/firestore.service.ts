import { inject, Injectable } from '@angular/core';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { from, map, Observable } from 'rxjs';

import { firestore } from './firebase';

import { ToastService } from '@/shared/services/toast.service';

const FIRESTORE_NAME = 'member';

export interface Member {
  id: string;
  nickname: string;
  iconImage: string | null;
  twitterUserId: string | null;
  birthday: string | null;
  prefectures: string;
  techs: string[];
}

export const MemberInitial: Member = {
  id: '',
  nickname: '',
  iconImage: null,
  twitterUserId: null,
  birthday: null,
  prefectures: '',
  techs: [],
};

export interface MemberDetail {
  nickname: string;
  iconImage: string;
  twitterUserId: string | null;
  birthday: string | null;
  prefectures: string;
  techs: string[];
  participationReason: string;
  hobby: string[];
  description: string;
}

export const MemberDetailInitial: MemberDetail = {
  nickname: '',
  iconImage: '',
  twitterUserId: null,
  birthday: null,
  prefectures: '',
  techs: [],
  participationReason: '',
  hobby: [],
  description: '',
};

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private toastService = inject(ToastService);

  constructor() {}

  getMembers(): Observable<Member[]> {
    const memberRef = query(
      collection(firestore, FIRESTORE_NAME),
      orderBy('createdAt')
    );
    return from(getDocs(memberRef)).pipe(
      map((param) => {
        return param.docs.map((item): Member => {
          const data = item.data();
          return {
            id: item.id,
            nickname: data['nickname'],
            iconImage: data['iconImage'],
            twitterUserId: data['twitterUserId'],
            birthday: data['birthday'],
            prefectures: data['prefectures'],
            techs: data['techs'],
          };
        });
      })
    );
  }

  getMemberDetail(id: string): Observable<MemberDetail> {
    const memberRef = doc(
      firestore, FIRESTORE_NAME, id
    );
    return from(getDoc(memberRef)).pipe(
      map((snap): MemberDetail => {
        if (snap.exists()) {
          const data = snap.data();
          return {
            nickname: data['nickname'],
            iconImage: data['iconImage'],
            twitterUserId: data['twitterUserId'],
            birthday: data['birthday'],
            prefectures: data['prefectures'],
            techs: data['techs'],
            participationReason: data['participationReason'],
            hobby: data['hobby'],
            description: data['description'],
          };
        }

        this.toastService.error('failed get member detail.');
        return MemberDetailInitial;
      }),
    );
  }
}
