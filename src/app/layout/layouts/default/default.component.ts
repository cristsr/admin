import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { WINDOW } from 'core/config';
import { Submenu, Menu, NavMainAction, NavConfig } from 'layout/types';
import { Subject } from 'rxjs';
import { SidebarComponent } from 'layout/components';
import { LayoutMenu } from 'layout/layout.config';
import { NavService } from 'layout/services';

@Component({
  selector: 'app-default-layout',
  template: `
    <div appPan [target]="sidebar">
      <!-- Sidebar -->
      <app-sidebar
        [menu]="menu"
        (menuChanges)="selectMenu($event)"
        #sidebar
      ></app-sidebar>

      <div class="w-screen h-screen flex flex-col box-content">
        <!-- Navbar -->

        <app-nav
          class="flex-none"
          [title]="navConfig.title"
          [icon]="navConfig.icon"
          [action]="navConfig.action"
          [buttons]="navConfig.buttons"
          (actionChanges)="navMainAction($event)"
          (buttonChanges)="navAction($event)"
        >
        </app-nav>

        <div class="bg-[#EDEDF5] overflow-hidden grow">
          <router-outlet></router-outlet>
        </div>

        <!-- BottomNav -->
        <app-bottom-nav
          *ngIf="showBottomNav"
          class="flex-none"
          linkActiveClass="text-blue-500"
          [submenu]="submenu"
        >
        </app-bottom-nav>
      </div>
    </div>
  `,
  styleUrls: ['./default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  menu: Menu[] = LayoutMenu;
  submenu: Submenu[];
  navConfig: NavConfig;

  private unsubscribeAll = new Subject<void>();

  @ViewChild(SidebarComponent) sidebar: SidebarComponent;

  get showBottomNav(): boolean {
    return true;
  }

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef,
    private navService: NavService,
  ) {}

  ngOnInit(): void {
    this.setupObservers();
    this.setupDefaultMenu();
  }

  setupObservers(): void {
    this.navService.config.subscribe({
      next: (config: NavConfig) => {
        this.navConfig = config;
        console.log('navConfig', this.navConfig);
        this.cd.detectChanges();
      },
    });
  }

  setupDefaultMenu(): void {
    const defaultMenu = this.menu.find((v: Menu) => v.default);

    if (!defaultMenu) {
      return;
    }

    this.submenu = defaultMenu.submenu;

    // Update title
    this.navService.nextConfig({
      title: defaultMenu.title,
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  selectMenu(menu: Menu): void {
    this.submenu = menu.submenu;
    this.navConfig.title = menu.title;

    // Update title
    this.navService.nextConfig({
      title: menu.title,
    });
  }

  navMainAction(action: NavMainAction): void {
    console.log(action);
    if (action === 'toggle') {
      this.sidebar.toggleSidebar();
    }
    this.navService.nextMainAction(action);
  }

  navAction(action: string): void {
    this.navService.nextAction(action);
  }
}
