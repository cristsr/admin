import { Injectable } from '@angular/core';
import { LayoutService } from '../layout/layout.service';
import { delay, filter, map, pluck } from 'rxjs/operators';
import { ActivationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  isExpandedMenu$ = this.layoutService.state$.pipe(
    pluck('expandSidebar')
  );

  menu$ = this.layoutService.state$.pipe(
    pluck('menu')
  );

  submenu$ = this.layoutService.state$.pipe(
    pluck('submenu')
  );

  pageTitle$ = this.layoutService.state$.pipe(
    pluck('pageTitle')
  );

  constructor(
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.listenPageChanges();
  }

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  setSubmenu(path): void {
    this.layoutService.setSubmenu(path);
  }

  listenPageChanges(): void {
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      map((event: any) => event.snapshot.routeConfig),
      filter(({loadChildren, path}) => loadChildren && path),
      pluck('path'),
      delay(1)
    ).subscribe(path => {
      this.layoutService.setPageTitle(path);
      this.layoutService.setSubmenu(path);
    });
  }
}
