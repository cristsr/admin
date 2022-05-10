import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ProgressComponent],
  imports: [CommonModule, MatRippleModule],
  exports: [ProgressComponent],
})
export class ProgressModule {}
