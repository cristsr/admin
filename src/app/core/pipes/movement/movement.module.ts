import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementPipe } from './movement.pipe';

@NgModule({
  declarations: [MovementPipe],
  exports: [MovementPipe],
  imports: [CommonModule],
})
export class MovementModule {}
