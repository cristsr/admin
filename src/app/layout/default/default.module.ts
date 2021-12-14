import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavModule } from 'core/components/nav/nav.module';
import { PanModule } from 'core/directives/pan/pan.module';

import { SidebarModule } from '../common/sidebar/sidebar.module';
import { BottomNavModule } from '../common/bottom-nav/bottom-nav.module';
import { DefaultLayoutComponent } from './default.component';


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
    PanModule,
  ],
  exports: [
    DefaultLayoutComponent
  ]
})
export class DefaultLayoutModule { }
