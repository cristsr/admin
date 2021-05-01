import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <button (click)="changeTheme()">change theme</button>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    // this.layoutService.listenPageChanges();
  }

  changeTheme(): void {
    this.themeService.toggleTheme();
  }
}
