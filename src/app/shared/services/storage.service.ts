import { Injectable } from '@angular/core';

enum StorageKey {
  userId = 'userId',
}

class StorageRepository {
  constructor(private storage = sessionStorage) {}

  getItem(key: StorageKey) {
    return this.storage.getItem(key);
  }

  setItem(key: StorageKey, value: string): void {
    this.storage.setItem(key, value);
  }

  removeItem(key: StorageKey): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = new StorageRepository();

  constructor() {}

  get userId(): string | null {
    return this.storage.getItem(StorageKey.userId);
  }

  setUserId(userId: string): void {
    this.storage.setItem(StorageKey.userId, userId);
  }

  clear(): void {
    this.storage.clear();
  }
}
