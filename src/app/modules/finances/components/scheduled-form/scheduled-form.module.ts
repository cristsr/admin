import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScheduledFormComponent } from './scheduled-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CapitalizeModule } from 'core/pipes';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [ScheduledFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    CapitalizeModule,
    MatDatepickerModule,
  ],
})
export class ScheduledFormModule {}
