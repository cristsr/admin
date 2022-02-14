import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMovementRoutingModule } from './add-movement-routing.module';
import { AddMovementComponent } from './add-movement.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectModule } from 'core/components/select';
import { CategoryModule } from 'core/components/category/category.module';

@NgModule({
  declarations: [AddMovementComponent],
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
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    SelectModule,
    CategoryModule,
  ],
})
export class AddMovementModule {}
