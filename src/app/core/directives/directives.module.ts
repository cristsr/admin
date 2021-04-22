import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorDirective } from './color/color.directive';
import { ThemeDirective } from './theme/theme.directive';



@NgModule({
  declarations: [
    ColorDirective,
    ThemeDirective
  ],
  exports: [
    ColorDirective,
    ThemeDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
