import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ListItemModule,
  MovementListModule,
} from 'modules/finances/components';
import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { CapitalizeModule } from 'core/pipes/capitalize/capitalize.module';

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
    ListItemModule,
    CapitalizeModule,
  ],
  providers: [DecimalPipe],
})
export class SummaryModule {}
