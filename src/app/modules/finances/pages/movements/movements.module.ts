import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MovementDetailComponent } from './detail/movement-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MovementsListComponent } from './list/movements-list.component';
import { InfiniteScrollModule } from 'core/directives/infinite-scroll';
import { GroupByModule } from 'modules/finances/pipes/group-by';
import { DatetimeModule } from 'core/pipes/datetime';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    MovementsComponent,
    MovementsListComponent,
    MovementDetailComponent,
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDialogModule,
    InfiniteScrollModule,
    GroupByModule,
    DatetimeModule,
    MatMenuModule,
  ],
})
export class MovementsModule {}
