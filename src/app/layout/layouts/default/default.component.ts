import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Submenu, Menu } from 'layout/types';
import { Subject, takeUntil } from 'rxjs';
import { EventEmitterService } from 'core/services';
import { NavigationService } from 'layout/services';

@Component({
  selector: 'app-default-layout',
  template: `
    <!-- Progress bar Loader-->
    <app-loader></app-loader>

    <app-alert></app-alert>

    <!-- Container -->
    <div appPan [target]="sidebar" class="flex flex-col">
      <!-- Sidebar -->
      <app-sidebar [menu]="menu" #sidebar></app-sidebar>

      <!-- Content -->
      <div class="w-screen h-screen flex flex-col box-content">
        <!-- Navbar -->
        <app-nav class="flex-none"></app-nav>

        <!-- Router outlet -->
        <div class="overflow-hidden grow">
          <router-outlet></router-outlet>
        </div>

        <!-- BottomNav -->
        <app-bottom-nav
          *ngIf="!!submenu"
          class="flex-none"
          [submenu]="submenu"
        ></app-bottom-nav>
      </div>
    </div>
  `,
  styleUrls: ['./default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  menu: Menu[];
  submenu: Submenu[] | null;
  #unsubscribeAll = new Subject<void>();

  constructor(
    private cd: ChangeDetectorRef,
    private emitter: EventEmitterService,
    private navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
  }

  setupObservers(): void {
    this.navigationService.config
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: (menu: Menu[]) => {
          this.menu = menu;
          this.cd.markForCheck();
        },
      });

    this.navigationService.currentMenu
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: (menu: Menu) => {
          this.submenu = menu.submenu;
          this.emitter.emit('nav:title', menu.title);
          this.cd.detectChanges();
        },
      });
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }
}
