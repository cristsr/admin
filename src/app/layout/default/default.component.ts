import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu, Submenu } from 'core/interfaces/menu';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from 'core/config';
import { AppConfig } from '../../app.config';
import { EventEmitter2 } from 'eventemitter2';
import { LayoutEvents } from 'layout/constants';

@Component({
  selector: 'app-default-layout',
  host: {
    class: '',
  },
  template: `
    <div appPan [target]="sidebar">
      <!-- Sidebar -->
      <app-sidebar
        [menu]="menu"
        (menuChange)="onLinkClick($event)"
        #sidebar
      ></app-sidebar>

      <div class="w-screen h-screen flex flex-col box-content">
        <!-- Navbar -->

        <app-nav
          class="flex-none"
          [title]="navTitle"
          (menuToggle)="sidebar.toggleSidebar()"
        ></app-nav>

        <div class="bg-gray-100 overflow-hidden grow">
          <router-outlet></router-outlet>
        </div>

        <!-- BottomNav -->
        <app-bottom-nav
          class="flex-none"
          *ngIf="showBottomNav"
          linkActiveClass="text-blue-500"
          [config]="currentSubmenu"
          (action)="onBottomNavAction($event)"
        ></app-bottom-nav>
      </div>
    </div>
  `,
  styleUrls: ['./default.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  menu: Menu[] = AppConfig.menu as any;

  currentSubmenu: Submenu[];

  sidebarLabel: Record<any, any>;

  get navTitle(): string {
    return 'Admin';
  }

  get showBottomNav(): boolean {
    return true;
  }

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute,
    private eventEmitter: EventEmitter2,
  ) {}

  ngOnInit(): void {
    const defaultMenu = this.menu.find((v) => v.default);
    this.showOrHideBottomNav(defaultMenu);
  }

  onBottomNavAction(event: any): void {
    this.eventEmitter.emit(LayoutEvents.BottomNavigation, event);
  }

  onLinkClick(menu: Menu): void {
    console.log(menu);
    this.showOrHideBottomNav(menu);
    this.toggleSidebar();
  }

  showOrHideBottomNav(menu: Menu): void {
    this.currentSubmenu = menu.submenu;
  }

  toggleSidebar(): void {}

  onLabel(event: Record<any, any>): void {
    this.sidebarLabel = event;
  }
}
