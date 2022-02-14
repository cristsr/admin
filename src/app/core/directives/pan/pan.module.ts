import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanDirective } from './pan.directive';

@NgModule({
  declarations: [PanDirective],
  imports: [CommonModule],
  exports: [PanDirective],
})
export class PanModule {}
