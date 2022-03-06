import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThousandSuffixPipe } from './thousand-suffixes.pipe';

@NgModule({
  declarations: [ThousandSuffixPipe],
  providers: [ThousandSuffixPipe],
  imports: [CommonModule],
  exports: [ThousandSuffixPipe],
})
export class ThousandSuffixesModule {}
