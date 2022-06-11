import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SplashService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => {
        this.document.body.classList.add('splash-screen-hidden');
      });
  }
}
