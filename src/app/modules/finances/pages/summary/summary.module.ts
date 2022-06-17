import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardComponent, ListItemModule } from 'core/components';
import { CapitalizeModule } from 'core/pipes';
import { ContentComponent } from 'layout/components';
import { MovementListModule } from 'modules/finances/components';
import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';

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
    ContentComponent,
    CardComponent,
  ],
  providers: [DecimalPipe],
})
export class SummaryModule {}
