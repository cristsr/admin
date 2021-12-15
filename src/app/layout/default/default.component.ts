import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { Menu, Submenu } from 'core/interfaces/menu';
import { DOCUMENT } from '@angular/common';
import { LayoutService } from 'core/services/layout/layout.service';
import { WINDOW } from 'core/config';
import { SidebarService } from 'layout/services/sidebar.service';

@Component({
  selector: 'app-default-layout',
  host: {
    class: ''
  },
  template: `
    <div class="relative flex h-screen w-screen select-none"
         (panstart)="onPanStart($event)"
         (panmove)="onPan($event)"
         (panend)="onPanEnd($event)">

      <!-- Sidebar -->
      <app-sidebar
        [menu]="menu"
        (label)="onLabel($event)"
        (menuChange)="onLinkClick($event)">
      </app-sidebar>

      <div class="flex flex-col h-screen w-full">
        <div class="flex justify-end">
          <pre>
            {{sidebarLabel | json}}
          </pre>
        </div>

        <!-- Navbar -->

        <app-nav
          (menuToggle)="toggleSidebar()"
          [title]="navTitle">
        </app-nav>

        <div class="flex flex-col h-screen overflow-y-auto bg-gray-50">
          <router-outlet></router-outlet>
        </div>

        <!-- BottomNav -->
        <app-bottom-nav
          *ngIf="showBottomNav"
          linkActiveClass="text-blue-500"
          [config]="currentSubmenu"
          (action)="onAction($event)">
        </app-bottom-nav>
      </div>
    </div>
  `,
  styleUrls: ['./default.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  @ViewChild(SidebarComponent) sidebarRef: SidebarComponent;

  direction: 'vertical' | 'horizontal' = 'vertical';

  menu: Menu[] = [
    {
      icon: 'account_balance',
      title: 'Finanzas',
      url: 'finances',
      default: true,
      submenu: [
        {
          icon: 'pie_chart_outline',
          title: 'Resumen',
          url: 'finances/summary',
          type: 'link'
        },
        {
          icon: 'timeline',
          title: 'Movimientos',
          url: 'finances/movements',
          type: 'link'
        },
        {
          icon: 'attach_money',
          title: 'Presupuestos',
          url: 'finances/budgets',
          type: 'link'
        },
        {
          icon: 'add',
          title: 'Presupuestos',
          url: 'finances/add-movement',
          type: 'link'
        },
      ]
    },
    {
      icon: 'school',
      title: 'Educación',
      url: 'education',
      submenu: [
        {
          icon: 'description',
          title: 'Resumen',
          url: 'finances/summary',
          type: 'link'
        },
        {
          icon: 'timeline',
          title: 'Movimientos',
          url: 'finances/movements',
          type: 'link'
        },
        {
          icon: 'attach_money',
          title: 'Presupuestos',
          url: 'finances/budgets',
          type: 'link'
        },
        {
          icon: 'attach_money',
          title: 'Presupuetos',
          url: 'finances/budgets',
          type: 'link'
        },
      ]
    },
    {
      icon: 'description',
      title: 'Resumen',
      url: 'education2',
    },
    {
      icon: 'health_and_safety',
      title: 'Salud',
      url: 'health',
    },
    {
      icon: 'settings',
      title: 'Ajustes',
      url: 'settings',
    }
  ];

  currentSubmenu: Submenu[];

  layout: 'default' | 'empty';
  sidebarLabel: Record<any, any>;


  get navTitle(): string {
    return this.layoutService.navTitle;
  }

  get showBottomNav(): boolean {
    return this.layoutService.showBottomNav;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private layoutService: LayoutService,
    private sidebarService: SidebarService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const defaultMenu = this.menu.find(v => v.default);
    this.showOrHideBottomNav(defaultMenu);

    this.activatedRoute.data.subscribe({
      next: ({layout}) => this.layout = layout,
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
    if (menu.submenu) {
      this.layoutService.showBottomNav = true;
      this.currentSubmenu = menu.submenu;
    } else {
      this.layoutService.showBottomNav = false;
    }
  }

  toggleSidebar(): void {
    this.sidebarRef.toggleSidebar();
    this.sidebarService.toggleSidebar();
  }

  onPanEnd(event: any): void {
    this.sidebarService.onPanEnd(event);
  }

  onPan(event: HammerInput): void {
    // If start direction is vertical then do nothing
    if (this.direction === 'vertical') {
      return;
    }

    const isPanHorizontal = event.direction === Hammer.DIRECTION_RIGHT || event.direction === Hammer.DIRECTION_LEFT;

    if (isPanHorizontal) {
      this.sidebarService.onPanHorizontal(event);
    }

    if (event.direction === Hammer.DIRECTION_RIGHT) {
      console.log('[RIGHT]');
    }

    if (event.direction === Hammer.DIRECTION_LEFT) {
      console.log('[LEFT]');
    }
  }

  onPanStart({direction}: HammerInput): void {
    console.clear();
    console.log('[START]');

    const isPanVertical = direction === Hammer.DIRECTION_UP || direction === Hammer.DIRECTION_DOWN;

    if (isPanVertical) {
      this.direction = 'vertical';
    } else {

      this.direction = 'horizontal';
      this.sidebarService.setInitialDirection(direction);

      if (direction === Hammer.DIRECTION_RIGHT) {
        console.log('INITIAL DIRECTION: RIGHT');
      }

      if (direction === Hammer.DIRECTION_LEFT) {
        console.log('INITIAL DIRECTION: LEFT');
      }
    }

  }

  onLabel(event: Record<any, any>): void {
    this.sidebarLabel = event;
  }
}
