import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementFilterComponent } from './movement-filter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CapitalizeModule } from 'core/pipes/capitalize/capitalize.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MovementFilterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CapitalizeModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class MovementFilterModule {}
