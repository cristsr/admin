import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarModule } from './common/sidebar/sidebar.module';
import { RouterModule } from '@angular/router';
import { NavModule } from '../core/components/nav/nav.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BottomNavModule } from './common/bottom-nav/bottom-nav.module';
import { DefaultLayoutModule } from './default/default.module';


const layoutModules = [
  DefaultLayoutModule,
];

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
    BottomNavModule,
    ...layoutModules
  ],
  exports: [
    LayoutComponent,
    RouterModule,
    ...layoutModules
  ]
})
export class LayoutModule { }
