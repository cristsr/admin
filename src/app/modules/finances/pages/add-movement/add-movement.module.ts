import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMovementRoutingModule } from './add-movement-routing.module';
import {
  AddMovementComponent,
  AddMovementDialogComponent,
} from './add-movement.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectModule } from 'core/components/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OverlayModule } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { CustomDateAdapter } from 'core/utils';

@NgModule({
  declarations: [AddMovementComponent, AddMovementDialogComponent],
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
    MatRadioModule,
    MatAutocompleteModule,
    OverlayModule,

    // Third party libraries
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ],
})
export class AddMovementModule {}
