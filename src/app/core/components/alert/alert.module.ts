import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [AlertComponent],
})
export class AlertModule {}
