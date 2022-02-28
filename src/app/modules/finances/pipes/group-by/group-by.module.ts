import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupByPipe } from './group-by.pipe';

@NgModule({
  declarations: [GroupByPipe],
  imports: [CommonModule],
  exports: [GroupByPipe],
})
export class GroupByModule {}
