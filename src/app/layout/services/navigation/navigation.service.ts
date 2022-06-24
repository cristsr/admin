import { Inject, Injectable } from '@angular/core';
import { NAVIGATION_CONFIG } from 'layout/constants';
import { Menu } from 'layout/types';
import {
  distinctUntilChanged,
  filter,
  Observable,
  of,
  ReplaySubject,
} from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  #currentMenu = new ReplaySubject<Menu>();

  constructor(
    @Inject(NAVIGATION_CONFIG) private navConfig: Menu[],
    private router: Router,
  ) {
    this.setupObservers();
  }

  get config(): Observable<Menu[]> {
    return of(this.navConfig);
  }

  get currentMenu(): Observable<Menu> {
    return this.#currentMenu.pipe(distinctUntilChanged(), delay(0));
  }

  setCurrentMenu(menu: Menu) {
    this.#currentMenu.next(menu);
  }

  private setupObservers(): void {
    // Subscribe to router events to update the current menu
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: (e: NavigationEnd) => {
          main: for (const menu of this.navConfig) {
            if (!menu.submenu) {
              if (menu.url !== e.urlAfterRedirects) {
                continue;
              }

              this.setCurrentMenu(menu);

              break;
            }

            for (const submenu of menu.submenu) {
              if (submenu.type === 'action') {
                continue;
              }

              if (submenu.url === e.urlAfterRedirects) {
                this.setCurrentMenu(menu);

                break main;
              }
            }
          }
        },
      });
  }
}
