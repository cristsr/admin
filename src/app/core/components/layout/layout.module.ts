import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavModule } from '../nav/nav.module';
import { SidebarModule } from '../sidebar/sidebar.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    SidebarModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
