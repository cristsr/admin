import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarModule } from '../core/components/sidebar/sidebar.module';
import { RouterModule } from '@angular/router';
import { NavModule } from '../core/components/nav/nav.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BottomNavModule } from '../core/components/bottom-nav/bottom-nav.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule,
    NavModule,
    NgApexchartsModule,
    BottomNavModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
