import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormListComponent } from './form-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ListSelectComponent } from './list-select.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FormListComponent,
    ListSelectComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatRippleModule,
    MatButtonModule,
  ],
  exports: [
    FormListComponent
  ]
})
export class FormListModule {
}
