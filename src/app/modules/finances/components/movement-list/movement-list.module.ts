import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementListComponent } from './movement-list.component';
import { ListItemModule } from 'core/components';
import { DatetimeModule, CapitalizeModule } from 'core/pipes';

@NgModule({
  declarations: [MovementListComponent],
  imports: [CommonModule, ListItemModule, DatetimeModule, CapitalizeModule],
  exports: [MovementListComponent],
})
export class MovementListModule {}
