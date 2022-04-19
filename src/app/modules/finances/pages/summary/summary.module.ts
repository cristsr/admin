import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MovementItemModule, MovementListModule } from 'modules/finances/components';

@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    MatRippleModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    NgApexchartsModule,
    MovementListModule,
    MovementItemModule,
  ],
})
export class SummaryModule {}
