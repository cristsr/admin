import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MovementDetailComponent } from './movement-detail/movement-detail.component';


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
    MatRippleModule
  ]
})
export class MovementsModule { }
