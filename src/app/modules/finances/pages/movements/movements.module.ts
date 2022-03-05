import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { InfiniteScrollModule } from 'core/directives/infinite-scroll';
import { DatetimeModule } from 'core/pipes/datetime';
import { MatMenuModule } from '@angular/material/menu';

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
  ],
})
export class MovementsModule {}
