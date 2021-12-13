import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultLayoutComponent } from './default.component';
import { SidebarModule } from '../common/sidebar/sidebar.module';
import { NavModule } from '../../core/components/nav/nav.module';
import { RouterModule } from '@angular/router';
import { BottomNavModule } from '../common/bottom-nav/bottom-nav.module';


@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    NavModule,
    BottomNavModule,
  ],
  exports: [
    DefaultLayoutComponent
  ]
})
export class DefaultLayoutModule { }
