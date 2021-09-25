import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMovementRoutingModule } from './add-movement-routing.module';
import { AddMovementComponent, DialogDataComponent } from './add-movement.component';
import { SelectModule } from '../../../core/components/select/select.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AddMovementComponent,
    DialogDataComponent
  ],
  imports: [
    CommonModule,
    AddMovementRoutingModule,
    SelectModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatSelectModule,
    MatListModule
  ]
})
export class AddMovementModule { }
