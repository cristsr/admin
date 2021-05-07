import { Component } from '@angular/core';
import { PageService } from '../../services/page/page.service';


@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="menu scrollable-y">
      <ul>
        <li class="menu-item" *ngFor="let menuItem of menu$ | async; index as i">
          <a
            class="menu-content"
            (click)="setSubmenuFromUrl(menuItem.url)"
            [routerLink]="menuItem.url"
            routerLinkActive="is-active">
            <span class="material-icons-outlined">{{ menuItem.icon }}</span>
            <span class="text">{{ menuItem.title }}</span>
          </a>
        </li>
      </ul>
    </aside>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menu$ = this.pageService.menu$;

  constructor(private pageService: PageService) { }

  setSubmenuFromUrl(submenu: any): void {
    this.pageService.setSubmenu(submenu);
  }
}
