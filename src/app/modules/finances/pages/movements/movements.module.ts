import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import {
  ContentComponent,
  CardComponent,
  ListItemModule,
} from 'core/components';
import { DatetimeModule } from 'core/pipes';
import { MovementListModule } from 'modules/finances/components';
import { MovementsComponent } from './movements.component';
import { MovementsRoutingModule } from './movements-routing.module';
import { GroupMovementModule } from 'modules/finances/pipes/group-movement/group-movement.module';

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
    ListItemModule,
    MovementListModule,
    GroupMovementModule,
    ContentComponent,
    CardComponent,
  ],
})
export class MovementsModule {}
