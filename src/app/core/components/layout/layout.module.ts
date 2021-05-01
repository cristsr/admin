import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavModule } from '../nav/nav.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ContainerModule } from '../container/container.module';
import { PageTabsModule } from '../page-tabs/page-tabs.module';
import { PageTitleModule } from '../page-title/page-title.module';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    NavModule,
    SidebarModule,
    ContainerModule,
    PageTabsModule,
    PageTitleModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
