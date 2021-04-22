import { Component, OnInit } from '@angular/core';
import { SideMenuService } from '../../services/side-menu.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
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

  public isExpandedMenu = this.sideMenuService.getExpandedMenu();
  public selectedSubmenu: number | null;

  constructor(private sideMenuService: SideMenuService) {
  }

  public ngOnInit(): void {
  }

  public showSubMenu(index): void {
    this.sideMenuService.showSubmenu(index);
  }

  public canShowSubmenu(i: number): boolean {
    return this.sideMenuService.canShowSubmenu(i);
  }

  setSelectedSubmenu(i: number | null): void {
    this.selectedSubmenu = i;
  }
}
