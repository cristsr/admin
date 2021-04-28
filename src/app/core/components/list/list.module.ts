import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';



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
    CommonModule
  ]
})
export class ListModule { }
