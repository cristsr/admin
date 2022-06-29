import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationConfig, colorsConfig, themeConfig } from 'layout/config';
import { DefaultLayoutModule, EmptyLayoutModule } from 'layout/layouts';
import { NAVIGATION_CONFIG, COLORS } from 'layout/constants';
import { NavigationService } from 'layout/services';
import { LayoutComponent } from './layout.component';
import { ThemeService } from 'core/services';
import { HttpClient } from '@angular/common/http';

const layoutModules = [EmptyLayoutModule, DefaultLayoutModule];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, ...layoutModules],
  exports: [LayoutComponent],
  providers: [
    {
      provide: NAVIGATION_CONFIG,
      useValue: NavigationConfig,
    },
    {
      provide: COLORS,
      useFactory: colorsConfig,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: themeConfig,
      deps: [HttpClient, ThemeService],
      multi: true,
    },
  ],
})
export class LayoutModule {
  constructor(
    private _navigation: NavigationService,
    private _theme: ThemeService,
  ) {}
}
