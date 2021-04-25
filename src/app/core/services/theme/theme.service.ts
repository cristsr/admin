import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  private destroy$ = new Subject();

  private themeChanges$ = new BehaviorSubject({
    name:  this.localStorage.getString('theme', 'light'),
    previous: null,
  });

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private localStorage: LocalStorageService
  ) {
    this.onThemeChanges();
  }

  public changeTheme(name: 'light' | 'dark'): void {
    const previous = this.themeChanges$.value.name;
    this.themeChanges$.next({name, previous});
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onThemeChanges(): void {
    this.themeChanges$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        if (theme.previous) {
          document.body.classList.remove(theme.previous + '-theme');
        }
        document.body.classList.add(theme.name + '-theme');
        this.localStorage.set('theme', theme.name);
      });
  }
}
