import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MovementsComponent } from './movements.component';
import { DatetimeModule } from 'core/pipes/datetime';
import { InfiniteScrollModule } from 'core/directives/infinite-scroll';
import { MovementsRoutingModule } from './movements-routing.module';
import {
  MovementItemModule,
  MovementListModule,
} from 'modules/finances/components';

@NgModule({
  declarations: [MovementsComponent],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDialogModule,
    MatMenuModule,
    DatetimeModule,
    InfiniteScrollModule,
    MovementItemModule,
    MovementListModule,
  ],
})
export class MovementsModule {}
