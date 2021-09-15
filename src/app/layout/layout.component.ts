import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SidebarComponent } from '../core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  host: {
    class: 'relative flex h-screen w-screen'
  },
  template: `
    <!-- Sidebar -->
    <app-sidebar [menu]="menu"></app-sidebar>

    <div class="flex flex-col h-screen w-full">
      <!-- Navbar -->
      <app-nav
        (menuToggle)="toggleSidebar()"
        [title]="navTitle"></app-nav>

      <!-- Content -->
      <div class="flex flex-col h-screen overflow-y-auto bg-gray-50">
        <ng-content></ng-content>
      </div>

      <!-- BottomNav -->
      <app-bottom-nav
        linkActiveClass="text-red-500"
        [config]="bottomNavConfig"
        (action)="onAction($event)">
      </app-bottom-nav>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild(SidebarComponent)
  sidebarRef: SidebarComponent;

  bottomNavConfig: any[] = [
    {
      icon: 'home',
      url: '',
      type: 'link',
    },
    {
      icon: 'home',
      url: '/movements',
      type: 'link'
    },
    {
      icon: 'home',
      type: 'action'
    },
    {
      icon: 'home',
      url: '',
      type: 'link'
    },
    {
      icon: 'home',
      url: '',
      type: 'link'
    }
  ];

  navTitle = 'Menu 1';

  menu = [
    {
      icon: 'account_balance',
      title: 'Finanzas',
      url: 'finances',
      submenu: [
        {
          icon: 'analytics',
          title: 'Resumen',
          url: 'finances/summary'
        },
        {
          icon: 'timeline',
          title: 'Movimientos',
          url: 'finances/movements'
        },
        {
          icon: 'attach_money',
          title: 'Presupuestos',
          url: 'finances/budgets',
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
          url: 'finances/summary'
        },
        {
          icon: 'timeline',
          title: 'Movimientos',
          url: 'finances/movements'
        },
        {
          icon: 'attach_money',
          title: 'Presupuestos',
          url: 'finances/budgets',
        },
        {
          icon: 'attach_money',
          title: 'Presupuetos',
          url: 'finances/budgets',
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

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
  }

  onAction(event: any): void {
    console.log(event);
  }

  toggleSidebar(): void {
    this.sidebarRef.toggleSidebar();
  }
}
