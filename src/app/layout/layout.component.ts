import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { LayoutService } from '../core/services/layout/layout.service';
import { Menu, Submenu } from '../core/interfaces/menu';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  host: {
    class: 'relative flex h-screen w-screen'
  },
  template: `
    <ng-template [ngIf]="layout === 'empty'">
      <router-outlet></router-outlet>
    </ng-template>

    <ng-template [ngIf]="layout === 'default'">
      <!-- Sidebar -->
      <app-sidebar
        [menu]="menu"
        (menuChange)="onLinkClick($event)">
      </app-sidebar>

      <div class="flex flex-col h-screen w-full">
        <!-- Navbar -->
        <app-nav
          (menuToggle)="toggleSidebar()"
          [title]="navTitle">
        </app-nav>

        <!-- Content -->
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
    </ng-template>

  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild(SidebarComponent) sidebarRef: SidebarComponent;

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

  get navTitle(): string {
    return this.layoutService.navTitle;
  }

  get showBottomNav(): boolean {
    return this.layoutService.showBottomNav;
  }

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private layoutService: LayoutService,
    private activatedRoute: ActivatedRoute
  ) { }

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
  }
}
