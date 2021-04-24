import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private window: Window) { }

  public set(key: string, value: any): void {
    if (typeof value === 'string') {
      return this.window.localStorage.setItem(key, value);
    }

    const str = JSON.stringify(value);
    return this.window.localStorage.setItem(key, str);
  }

  public getString(key: string, defaultValue?: string): string | null {
    return this.get(key) || defaultValue;
  }

  public getNumber(key: string, defaultValue?: number): number | null {
    return +this.get(key) || defaultValue;
  }

  public getBoolean(key: string, defaultValue?: boolean): boolean | null {
    const result = JSON.parse(this.get(key));

    if (!result) {
      return defaultValue;
    }

    if (typeof result !== 'boolean') {
      throw new TypeError(`the value of the key ${key} must be boolean`);
    }

    return result;
  }

  public getObject<T>(key: string): T | null {
    const result = JSON.parse(this.get(key));
    if (!result) {
      return null;
    }

    if (typeof result !== 'object') {
      throw new TypeError(`the value of the key ${key} must be an object`);
    }

    return result;
  }

  public deleteKey(key: string): void {
    this.window.localStorage.removeItem(key);
  }

  private get(key: string): string | null {
    return this.window.localStorage.getItem(key);
  }
}
