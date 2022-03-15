import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementListComponent } from './movement-list.component';
import { MovementItemModule } from 'modules/finances/components';
import { DatetimeModule } from 'core/pipes/datetime';
import { CapitalizeModule } from 'core/pipes/capitalize/capitalize.module';

@NgModule({
  declarations: [MovementListComponent],
  imports: [CommonModule, MovementItemModule, DatetimeModule, CapitalizeModule],
  exports: [MovementListComponent],
})
export class MovementListModule {}
