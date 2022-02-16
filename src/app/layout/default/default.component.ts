import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu, Submenu } from 'core/interfaces/menu';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from 'core/config';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-default-layout',
  host: {
    class: '',
  },
  template: `
    <div
      appPan
      [element]="sidebar"
      class="relative flex h-screen w-screen select-none"
    >
      <!-- Sidebar -->
      <app-sidebar
        [menu]="menu"
        (label)="onLabel($event)"
        (menuChange)="onLinkClick($event)"
        #sidebar
      >
      </app-sidebar>

      <div class="flex flex-col h-screen w-full">
        <!-- Navbar -->

        <app-nav [title]="navTitle" (menuToggle)="sidebar.toggleSidebar()">
        </app-nav>

        <div class="flex flex-col h-screen overflow-y-auto bg-gray-100">
          <router-outlet></router-outlet>
        </div>

        <!-- BottomNav -->
        <app-bottom-nav
          *ngIf="showBottomNav"
          linkActiveClass="text-blue-500"
          [config]="currentSubmenu"
          (action)="onAction($event)"
        >
        </app-bottom-nav>
      </div>
    </div>
  `,
  styleUrls: ['./default.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  direction: 'vertical' | 'horizontal' = 'vertical';

  menu: Menu[] = AppConfig.menu as any;

  currentSubmenu: Submenu[];

  layout: 'default' | 'empty';

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
  ) {}

  ngOnInit(): void {
    const defaultMenu = this.menu.find((v) => v.default);
    this.showOrHideBottomNav(defaultMenu);

    this.activatedRoute.data.subscribe({
      next: ({ layout }) => (this.layout = layout),
    });
  }

  onAction(event: any): void {
    console.log(event);
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
