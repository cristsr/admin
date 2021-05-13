import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { FlexModule } from '../../directives/flex/flex.module';
import { IconModule } from '../icon/icon.module';
import { MovementsListComponent } from './movements-list/movements-list.component';
import { MovementItemComponent } from './movement-item/movement-item.component';



@NgModule({
  declarations: [
    ListComponent,
    ListItemComponent,
    MovementsListComponent,
    MovementItemComponent
  ],
  exports: [
    ListComponent,
    ListItemComponent,
    MovementsListComponent,
    MovementItemComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    IconModule
  ]
})
export class ListModule { }
