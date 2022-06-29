import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'core/services';
import { ThemeConfig } from 'layout/types';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  get current(): ThemeConfig {
    return this.themeService.current;
  }

  get themeConfig(): ThemeConfig[] {
    return this.themeService.themeConfig;
  }

  ngOnInit(): void {
    return;
  }

  setTheme(theme: any): void {
    console.log('setTheme', theme);
    this.themeService.setTheme(theme.target.value);
  }
}
