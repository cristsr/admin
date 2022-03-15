import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementRangeComponent } from './movement-range.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [MovementRangeComponent],
  imports: [CommonModule, MatIconModule, MatRippleModule],
})
export class MovementRangeModule {}
