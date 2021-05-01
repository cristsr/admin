import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title.component';
import { ContainerModule } from '../container/container.module';



@NgModule({
  declarations: [
    PageTitleComponent
  ],
  exports: [
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    ContainerModule
  ]
})
export class PageTitleModule { }
