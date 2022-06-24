import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanModule } from 'core/directives';
import { AlertModule, LoaderComponent } from 'core/components';
import {
  BottomNavModule,
  NavComponent,
  NavigationComponent,
} from 'layout/components';
import { DefaultLayoutComponent } from './default.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [DefaultLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    BottomNavModule,
    PanModule,
    AlertModule,
    MatProgressBarModule,
    NavigationComponent,
    LoaderComponent,
    NavComponent,
  ],
  exports: [DefaultLayoutComponent],
})
export class DefaultLayoutModule {}
