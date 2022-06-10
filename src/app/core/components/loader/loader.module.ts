import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'core/components';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule],
  exports: [LoaderComponent],
})
export class LoaderModule {}
