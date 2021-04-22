import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  togle = false;

  constructor(private themeService: ThemeService) {
  }

  changeTheme(): void {
    if (this.togle) {
      this.themeService.changeTheme('light');
    } else {
      this.themeService.changeTheme('dark');
    }

    this.togle = !this.togle;
  }
}
