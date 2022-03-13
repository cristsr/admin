import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MovementItemComponent } from './movement-item.component';

@NgModule({
  declarations: [MovementItemComponent],
  imports: [CommonModule, MatRippleModule, MatIconModule],
  exports: [MovementItemComponent],
})
export class MovementItemModule {}
