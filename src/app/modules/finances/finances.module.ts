import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesRoutingModule } from './finances-routing.module';
import { FinancesComponent } from './finances.component';
import { TabsetModule } from '../../core/components/tabset/tabset.module';
import { CardModule } from '../../core/components/card/card.module';
import { SummaryComponent } from './summary/summary.component';
import { MovementsComponent } from './movements/movements.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { ChartModule } from '../../core/components/chart/chart.module';
import { IconModule } from '../../core/components/icon/icon.module';
import { LabelIconModule } from '../../core/components/label-icon/label-icon.module';
import { FlexModule } from '../../core/directives/flex/flex.module';
import { MovementModule } from '../../core/pipes/movement/movement.module';
import { SelectModule } from '../../core/components/select/select.module';
import { ProgressModule } from '../../core/components/progress/progress.module';
import { ThousandSuffixesModule } from '../../core/pipes/thousand-suffixes/thousand-suffixes.module';
import { MovementsListComponent } from './movements/movements-list/movements-list.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    FinancesComponent,
    MovementsListComponent,
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule,
    TabsetModule,
    CardModule,
    ChartModule,
    IconModule,
    LabelIconModule,
    FlexModule,
    MovementModule,
    SelectModule,
    ProgressModule,
    ThousandSuffixesModule,
    NgApexchartsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatRippleModule,
    MatDialogModule
  ]
})
export class FinancesModule { }
