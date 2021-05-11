import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FlexModule } from '../../directives/flex/flex.module';
import { IconModule } from '../icon/icon.module';



@NgModule({
  declarations: [
    ListComponent,
    ListItemComponent
  ],
  exports: [
    ListComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    IconModule
  ]
})
export class ListModule { }
