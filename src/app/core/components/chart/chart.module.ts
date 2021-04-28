import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Chart,
  Legend,
  Title,
  Tooltip,
  LinearScale,
  CategoryScale,
  BarElement,
  ArcElement,
  DoughnutController,
  BarController,
} from 'chart.js';

import { ChartDirective } from './chart/chart.directive';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';

Chart.register(
  Legend,
  Title,
  Tooltip,
  LinearScale,
  CategoryScale,
  BarElement,
  ArcElement,
  DoughnutController,
  BarController,
);


@NgModule({
  declarations: [
    ChartDirective,
    ChartPieComponent,
    ChartBarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ChartDirective,
    ChartPieComponent,
    ChartBarComponent
  ]
})
export class ChartModule { }
