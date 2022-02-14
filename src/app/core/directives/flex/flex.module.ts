import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexDirective } from './flex.directive';

@NgModule({
  declarations: [FlexDirective],
  exports: [FlexDirective],
  imports: [CommonModule],
})
export class FlexModule {}
