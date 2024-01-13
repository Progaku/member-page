import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { catchError, from, map, Observable, of } from 'rxjs';

import { firebaseStorage } from '@/api/firebase';

const fireStorageRef = (uuid: string) => `memberIcon/${uuid}`;

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {

  constructor() { }

  getImageUri(uuid: string): Observable<string | null> {
    const imageRef = ref(firebaseStorage, fireStorageRef(uuid));
    return from(getDownloadURL(imageRef)).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }

  setStorage(uuid: string, base64Image: string): Observable<void> {
    const storageRef = ref(firebaseStorage, fireStorageRef(uuid));
    return from(
      uploadString(
        storageRef,
        base64Image,
        'base64',
        { contentType: 'image/jpg' }
      )
    ).pipe(
      map(() => {})
    );
  }

  deleteStorage(uuid: string): Observable<void> {
    const storageRef = ref(firebaseStorage, fireStorageRef(uuid));
    return from(deleteObject(storageRef));
  }
}
