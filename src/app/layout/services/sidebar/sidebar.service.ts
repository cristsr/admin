import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Menu } from 'layout/types';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _config = new Subject<Menu[]>();
  private _toggle = new Subject<void>();
  private _menuChanges = new Subject<Menu>();

  get config(): Observable<Menu[]> {
    return this._config.asObservable();
  }
  setConfig(config: Menu[]): void {
    this._config.next(config);
  }

  get toggle(): Observable<void> {
    return this._toggle.asObservable();
  }
  nextToggle(): void {
    this._toggle.next();
  }

  get menuChanges(): Observable<Menu> {
    return this._menuChanges.asObservable();
  }
  nextMenuChanges(menu: Menu): void {
    this._menuChanges.next(menu);
  }
}
