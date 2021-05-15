import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconModule } from '../icon/icon.module';
import { FlexModule } from '../../directives/flex/flex.module';



@NgModule({
  declarations: [ButtonComponent],
  exports: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    FlexModule
  ]
})
export class ButtonModule { }
