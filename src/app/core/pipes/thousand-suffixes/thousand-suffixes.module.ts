import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThousandSuffixesPipe } from './thousand-suffixes.pipe';



@NgModule({
  declarations: [
    ThousandSuffixesPipe,
  ],
  providers: [
    ThousandSuffixesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThousandSuffixesPipe
  ]
})
export class ThousandSuffixesModule { }
