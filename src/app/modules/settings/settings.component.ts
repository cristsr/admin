import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'core/services';
import { Scheme, ThemeConfig } from 'layout/types';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  get currentTheme(): ThemeConfig {
    return this.themeService.currentTheme;
  }

  get themeConfig(): ThemeConfig[] {
    return this.themeService.themeConfig;
  }

  get scheme(): Scheme {
    return this.themeService.scheme;
  }

  get buttonClass(): any {
    return {
      'bg-default': this.scheme === 'light',
      'bg-dark': this.scheme === 'dark',
    };
  }

  ngOnInit(): void {
    return;
  }

  setTheme(theme: any): void {
    console.log('setTheme', theme);
    this.themeService.setTheme(theme);
  }

  toggleScheme({ checked }): void {
    this.themeService.setScheme(checked ? 'dark' : 'light');
    console.log('toggleScheme', checked);
  }
}
