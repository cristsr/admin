import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COLORS } from 'core/constants';
import { colorsConfig } from 'core/config';
import { DefaultLayoutModule, EmptyLayoutModule } from 'layout/layouts';
import { NAVIGATION_CONFIG } from 'layout/constants';
import { NavigationConfig } from 'layout/layout.config';
import { NavigationService } from 'layout/services';
import { LayoutComponent } from './layout.component';
import { ThemeService } from 'core/services';

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
  ],
})
export class LayoutModule {
  constructor(
    private _navigation: NavigationService,
    private _theme: ThemeService,
  ) {}
}
