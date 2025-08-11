import { Injectable } from '@angular/core';
import {
  browserSessionPersistence,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { firebaseAuth } from './firebase';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthenticationService {
  constructor() {}

  login(userId: string, password: string): Observable<UserCredential> {
    firebaseAuth.setPersistence(browserSessionPersistence).then();
    return from(signInWithEmailAndPassword(firebaseAuth, userId, password));
  }

  anonymousLogin(): Observable<UserCredential> {
    firebaseAuth.setPersistence(browserSessionPersistence).then();
    return from(signInAnonymously(firebaseAuth));
  }

  logout(): Observable<void> {
    return from(signOut(firebaseAuth));
  }

  isAuth(): boolean {
    return !!getAuth().currentUser;
  }
}
