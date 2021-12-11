import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MovementDetailComponent } from './detail/movement-detail.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    MovementsComponent,
    MovementDetailComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDialogModule
  ],
})
export class MovementsModule { }
