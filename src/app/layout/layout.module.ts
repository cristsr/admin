import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DefaultLayoutModule, EmptyLayoutModule } from 'layout/layouts';
import { NAVIGATION_CONFIG } from 'layout/constants';
import { NavigationConfig } from 'layout/layout.config';
import { NavigationService } from 'layout/services';

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
  ],
})
export class LayoutModule {
  constructor(private _navigation: NavigationService) {}
}
