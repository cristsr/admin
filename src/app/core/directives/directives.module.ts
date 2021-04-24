import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorDirective } from './color/color.directive';
import { ThemeDirective } from './theme/theme.directive';
import { TabDirective } from './theme/tab.directive';



@NgModule({
  declarations: [
    ColorDirective,
    ThemeDirective,
    TabDirective
  ],
  exports: [
    ColorDirective,
    ThemeDirective,
    TabDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
