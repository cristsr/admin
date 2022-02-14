import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MovementDetailComponent } from './detail/movement-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MovementsListComponent } from 'modules/finances/movements/list/movements-list.component';
import { MovementModule } from 'core/pipes/movement/movement.module';


@NgModule({
  declarations: [
    MovementsComponent,
    MovementsListComponent,
    MovementDetailComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDialogModule,
    MovementModule
  ],
})
export class MovementsModule { }
