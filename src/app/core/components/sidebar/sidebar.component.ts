import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuExample = [
    {
      icon: 'school',
      title: 'Educación',
      url: 'education',
    },
    {
      icon:  'account_balance',
      title: 'Finanzas',
      subMenu: [
        {
          title: 'Resumen',
          url: 'finances'
        },
        {
          title: 'Registro de movimientos',
          url: 'finances/movements'
        },
        {
          title: 'Facturas',
          url: 'finances/invoices',
        },
        {
          title: 'Compras',
          url: 'finances/purchases'
        }
      ]
    },
    {
      icon:  'health_and_safety',
      title: 'Salud',
      url: '/3',
    }
  ];

  public isExpandedMenu = this.sidebarService.getExpandedMenu();
  public selectedSubmenu: number | null;

  constructor(private sidebarService: SidebarService) {
  }

  public ngOnInit(): void {
  }

  public showSubMenu(index): void {
    this.sidebarService.showSubmenu(index);
  }

  public canShowSubmenu(i: number): boolean {
    return this.sidebarService.canShowSubmenu(i);
  }

  setSelectedSubmenu(i: number | null): void {
    this.selectedSubmenu = i;
  }
}
