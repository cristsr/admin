import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogRegisterService {
  private readonly store = new Map<string, Type<any>>();

  constructor() {}

  register(key: string, component: Type<any>): void {
    this.store.set(key, component);
  }

  get<T>(key: string): Type<T> {
    return this.store.get(key);
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  reset(): void {
    this.store.clear();
  }
}
