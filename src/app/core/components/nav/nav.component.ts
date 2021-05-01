import { Component } from '@angular/core';
import { PageService } from '../../services/sidebar/page.service';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <header>
        <div class="menu" (click)="onToggleSideMenu()">
          <span class="material-icons-outlined">menu_open</span>
        </div>
        <a href="#" class="logo">Admin</a>
        <ul class="items">
          <li>
            <span class="link">Instagram</span>
          </li>
          <li>
            <span class="link">Pinterest</span>
          </li>
          <li>
            <a class="link">Movies</a>
          </li>
        </ul>
      </header>
    </nav>
  `,
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private pageService: PageService) { }

  public onToggleSideMenu(): void {
    this.pageService.toggleSidebar();
  }
}
