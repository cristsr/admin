import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Submenu, Menu } from 'layout/types';
import { Subject } from 'rxjs';
import { LayoutMenu } from 'layout/layout.config';
import { EventEmitterService } from 'core/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  template: `
    <app-loader></app-loader>
    <app-alert></app-alert>

    <!-- Container -->
    <div appPan [target]="sidebar" class="flex flex-col">
      <!-- Sidebar -->
      <app-sidebar
        [menu]="menu"
        (menuChanges)="selectMenu($event)"
        #sidebar
      ></app-sidebar>

      <!-- Content -->
      <div class="w-screen h-screen flex flex-col box-content">
        <!-- Navbar -->
        <app-nav class="flex-none"></app-nav>

        <!-- Router outlet -->
        <div class="bg-[#EDEDF5] overflow-hidden grow">
          <router-outlet></router-outlet>
        </div>

        <!-- BottomNav -->
        <app-bottom-nav class="flex-none" [submenu]="submenu"></app-bottom-nav>
      </div>
    </div>
  `,
  styleUrls: ['./default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  menu: Menu[] = LayoutMenu;
  submenu: Submenu[];
  #unsubscribeAll = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private emitter: EventEmitterService,
  ) {}

  ngOnInit(): void {
    console.log('[DefaultLayoutComponent] ngOnInit');

    this.setupObservers();
    this.setupDefaultMenu();
  }

  setupObservers(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        console.log('[DefaultLayoutComponent] data', data);
      },
    });
  }

  setupDefaultMenu(): void {
    const defaultMenu = this.menu.find((v: Menu) => v.default);

    if (!defaultMenu) {
      return;
    }

    this.submenu = defaultMenu.submenu;

    // Hack to update title
    setTimeout(() => {
      this.emitter.emit('nav:title', defaultMenu.title);
    }, 0);
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }

  selectMenu(menu: Menu): void {
    this.submenu = menu.submenu;
    this.emitter.emit('nav:title', menu.title);
  }
}
