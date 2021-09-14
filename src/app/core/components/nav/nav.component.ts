import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-nav',
  host: {
    class: 'flex h-12 items-center shadow-sm z-10'
  },
  template: `
    <button mat-icon-button aria-label="Menu" (click)="toggleSidebar()">
      <mat-icon>menu</mat-icon>
    </button>
    <div class="text-md font-medium" (click)="changeTheme()">Menu</div>
    <div class="flex-grow"></div>
    <button mat-icon-button aria-label="Notifications">
      <mat-icon>notifications</mat-icon>
    </button>
  `,
})
export class NavComponent {

  constructor(
    private navigation: NavigationService,
    private themeService: ThemeService
  ) {
  }

  toggleSidebar(): void {
    this.navigation.toggleSidebar();
  }

  changeTheme(): void {
    this.themeService.toggleTheme();
  }
}
