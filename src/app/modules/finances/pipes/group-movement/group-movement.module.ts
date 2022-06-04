import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupMovementPipe } from './group-movement.pipe';

@NgModule({
  declarations: [GroupMovementPipe],
  imports: [CommonModule],
  exports: [GroupMovementPipe],
})
export class GroupMovementModule {}
