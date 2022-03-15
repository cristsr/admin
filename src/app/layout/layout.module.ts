import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DefaultLayoutModule, EmptyLayoutModule } from 'layout/layouts';

const layoutModules = [EmptyLayoutModule, DefaultLayoutModule];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, ...layoutModules],
  exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
