import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelIconComponent } from './label-icon.component';
import { IconModule } from '../icon/icon.module';



@NgModule({
  declarations: [
    LabelIconComponent
  ],
  exports: [
    LabelIconComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class LabelIconModule { }
