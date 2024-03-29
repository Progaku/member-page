import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  serverTimestamp,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { from, map, Observable } from 'rxjs';

import { firestore } from './firebase';

const FIRESTORE_NAME = 'member';

/** メンバー一覧 */
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

/** メンバー詳細 */
export interface MemberDetail {
  nickname: string;
  iconImage: string | null;
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
  iconImage: null,
  twitterUserId: null,
  birthday: null,
  prefectures: '',
  techs: [],
  participationReason: '',
  hobby: [],
  description: '',
};

/** ログインユーザ */
export interface LoginUser {
  id: string;
}

/** ユーザ登録リクエスト */
export interface RegisterUserRequest {
  memberId: string;
  nickname: string;
}

/** プロフィール更新 */
export interface UpdateMyInfoRequest {
  nickname: string;
  twitterUserId: string | null;
  birthday: string | null;
  prefectures: string;
  techs: string[];
  participationReason: string;
  hobby: string[];
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor() {}

  getMembers(): Observable<Member[]> {
    const memberRef = query(
      collection(firestore, FIRESTORE_NAME),
      orderBy('createdAt', 'desc')
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

  getMemberById(id: string): Observable<MemberDetail | null> {
    const memberRef = doc(
      firestore, FIRESTORE_NAME, id
    );
    return from(getDoc(memberRef)).pipe(
      map((snap): MemberDetail | null => {
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

        return null;
      }),
    );
  }

  getMemberByMemberId(memberId: string): Observable<LoginUser | null> {
    const loginUserRef = query(
      collection(firestore, FIRESTORE_NAME),
      where('memberId', '==', memberId)
    );
    return from(getDocs(loginUserRef)).pipe(
      map((param): LoginUser | null => {
        if (param.empty) {
          return null;
        }

        const data = param.docs[0];

        return {
          id: data.id
        };
      })
    );
  }

  registerUser(param: RegisterUserRequest): Observable<void> {
    const memberRef = collection(firestore, FIRESTORE_NAME);
    return from(addDoc(memberRef, {
      nickname: param.nickname,
      memberId: param.memberId,
      createdAt: serverTimestamp(),
      iconImage: null,
      twitterUserId: null,
      birthday: null,
      prefectures: '',
      techs: [],
      participationReason: '',
      hobby: [],
      description: '',
    })).pipe(
      map(() => {})
    );
  }

  updateMyInfo(id: string, param: UpdateMyInfoRequest): Observable<void> {
    const myInfoRef = doc(
      firestore, FIRESTORE_NAME, id
    );
    return from(updateDoc(myInfoRef, { ...param }));
  }

  uploadMyIcon(id: string, iconImageId: string): Observable<void> {
    const myInfoRef = doc(
      firestore, FIRESTORE_NAME, id
    );
    return from(updateDoc(myInfoRef, { iconImage: iconImageId }));
  }
}
