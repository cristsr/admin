import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { BaseInputModule } from 'core/components/base-input';

@NgModule({
  declarations: [CategoryComponent],
  imports: [BaseInputModule, CommonModule],
  exports: [CategoryComponent],
})
export class CategoryModule {}
