import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NavConfig, NavMainAction } from 'layout/types';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  #config = new BehaviorSubject<NavConfig>({
    title: '',
    icon: 'menu',
    action: 'toggle',
    buttons: [],
  });

  #mainAction = new Subject<NavMainAction>();

  #action = new Subject<string>();

  // Config methods
  get config(): Observable<NavConfig> {
    return this.#config.asObservable();
  }

  nextConfig(config: NavConfig): void {
    const value = {
      ...this.#config.value,
      ...config,
    };

    this.#config.next(value);
  }

  // Main action methods
  get mainAction(): Observable<NavMainAction> {
    return this.#mainAction.asObservable();
  }

  nextMainAction(action: NavMainAction): void {
    this.#mainAction.next(action);
  }

  // Action methods
  get action(): Observable<string> {
    return this.#action.asObservable();
  }

  nextAction(action: string): void {
    this.#action.next(action);
  }
}
