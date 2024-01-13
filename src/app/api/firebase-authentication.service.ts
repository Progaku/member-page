import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { from, Observable } from 'rxjs';

import { firebaseAuth } from './firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor() {}

  login(userId: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(firebaseAuth, userId, password));
  }

  logout(): Observable<void> {
    return from(signOut(firebaseAuth));
  }

  isAuth(): boolean {
    return !!getAuth().currentUser;
  }
}
