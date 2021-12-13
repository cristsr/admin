import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { Menu, Submenu } from '../../core/interfaces/menu';
import { DOCUMENT } from '@angular/common';
import { LayoutService } from '../../core/services/layout/layout.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { WINDOW } from '../../core/window/window';

@Component({
  selector: 'app-default-layout',
  host: {
    class: 'relative flex h-screen w-screen'
  },
  template: `
    <!-- Sidebar -->
    <app-sidebar
      [menu]="menu"
      (menuChange)="onLinkClick($event)">
    </app-sidebar>

    <div class="flex flex-col h-screen w-full"
         (panstart)="onPanStart($event)"
         (panmove)="onPanMove($event)"
         (panend)="onPanEnd($event)"
    >

      <!-- Navbar -->

      <app-nav
        (menuToggle)="toggleSidebar()"
        [title]="navTitle">
      </app-nav>
      <div class="flex justify-end">
        {{ divWidth }}
      </div>

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


  `,
  styleUrls: ['./default.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  panstart = new Subject<any>();

  panmove = new Subject<any>();

  panend = new Subject<any>();



  divWidth = 0;

  deltaXStart: number;
  deltaXEnd: any;



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

  spacecrr = 0;
  spacefn = '';

  symbol = 'no';
  transform: string;
  animation = false;
  isFinal = false;


  get navTitle(): string {
    return this.layoutService.navTitle;
  }

  get showBottomNav(): boolean {
    return this.layoutService.showBottomNav;
  }

  get divWithPercentage(): string {
    return `${this.divWidth}%`;
  }

  constructor(
    @Inject(DOCUMENT)
    private document: Document,

    @Inject(WINDOW)
    private window: Window,

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

  onPanStart($event): void {
    this.deltaXStart = $event.deltaX;
    this.sidebarRef.showSidebar = true;
    this.sidebarRef.widthPercentage = this.divWithPercentage;

    this.divWidth = -100;
    this.sidebarRef.widthPercentage = `-100%`;
  }

  onPanMove($event): void {
    this.panmove.next($event);

    const percentage = Math.floor((($event.deltaX - this.deltaXStart) / this.window.innerWidth) * 1.5 * 100);

    console.log(percentage);

    this.divWidth =  -100 + (percentage < 100 ? percentage : 100);

    console.log(this.divWidth);



    this.sidebarRef.showSidebar = true;
    this.sidebarRef.widthPercentage = this.divWithPercentage;
  }

  onPanEnd($event: any): void {
    if ($event.velocityX > .5 || this.divWidth > -70) {
      this.divWidth = 0;
      this.sidebarRef.showSidebar = true;

    } else {
      this.divWidth = -100;
      this.sidebarRef.showSidebar = false;
    }

    this.sidebarRef.widthPercentage = this.divWithPercentage;

  }
}
