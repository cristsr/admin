import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DefaultLayoutModule } from './default/default.module';
import { EmptyLayoutModule } from './empty/empty.module';


const layoutModules = [
  EmptyLayoutModule,
  DefaultLayoutModule,
];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ...layoutModules,
  ],
  exports: [
    LayoutComponent,
    ...layoutModules
  ]
})
export class LayoutModule { }
