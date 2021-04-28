import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <button (click)="changeTheme()">change theme</button>
  `
})
export class AppComponent {
  toggle = false;

  constructor(private themeService: ThemeService) { }

  changeTheme(): void {
    if (this.toggle) {
      this.themeService.changeTheme('dark');
    } else {
      this.themeService.changeTheme('light');
    }
    this.toggle = !this.toggle;
  }
}
