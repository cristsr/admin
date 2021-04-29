import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderComponent } from './layout-header.component';
import { ContainerModule } from '../container/container.module';
import { IconModule } from '../icon/icon.module';



@NgModule({
  declarations: [
    LayoutHeaderComponent
  ],
  exports: [
    LayoutHeaderComponent
  ],
  imports: [
    CommonModule,
    ContainerModule,
    IconModule
  ]
})
export class LayoutHeaderModule { }
