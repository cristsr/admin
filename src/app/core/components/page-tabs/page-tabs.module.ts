import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTabsComponent } from './page-tabs.component';
import { ContainerModule } from '../container/container.module';
import { IconModule } from '../icon/icon.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PageTabsComponent
  ],
  exports: [
    PageTabsComponent
  ],
  imports: [
    CommonModule,
    ContainerModule,
    IconModule,
    RouterModule
  ]
})
export class PageTabsModule { }
