import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDirective } from './chart/chart.directive';
import { ChartPieComponent } from './chart-pie/chart-pie.component';


@NgModule({
  declarations: [
    ChartDirective,
    ChartPieComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ChartDirective,
    ChartPieComponent
  ]
})
export class ChartModule { }
