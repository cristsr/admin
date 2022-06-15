import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanModule } from 'core/directives';
import { LoaderModule, AlertModule } from 'core/components';
import { BottomNavModule, SidebarModule, NavModule } from 'layout/components';
import { DefaultLayoutComponent } from './default.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [DefaultLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    NavModule,
    BottomNavModule,
    PanModule,
    LoaderModule,
    AlertModule,
    MatProgressBarModule,
  ],
  exports: [DefaultLayoutComponent],
})
export class DefaultLayoutModule {}
