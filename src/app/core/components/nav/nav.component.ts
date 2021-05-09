import { Component } from '@angular/core';
import { PageService } from '../../services/page/page.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <header>
        <div class="menu" (click)="onToggleSideMenu()">
          <span class="material-icons-outlined">menu_open</span>
        </div>
        <span (click)="changeTheme()" class="logo">Admin</span>
      </header>
    </nav>
  `,
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(
    private pageService: PageService,
    private themeService: ThemeService
  ) { }

  public onToggleSideMenu(): void {
    this.pageService.toggleSidebar();
  }

  changeTheme(): void {
    this.themeService.toggleTheme();
  }
}
