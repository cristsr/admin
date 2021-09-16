import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesRoutingModule } from './finances-routing.module';
import { FinancesComponent } from './finances.component';
import { TabsetModule } from '../../core/components/tabset/tabset.module';
import { CardModule } from '../../core/components/card/card.module';
import { SummaryComponent } from './components/summary/summary.component';
import { MovementsComponent } from './components/movements/movements.component';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { ChartModule } from '../../core/components/chart/chart.module';
import { IconModule } from '../../core/components/icon/icon.module';
import { LabelIconModule } from '../../core/components/label-icon/label-icon.module';
import { FlexModule } from '../../core/directives/flex/flex.module';
import { MovementModule } from '../../core/pipes/movement/movement.module';
import { AddMovementComponent } from './components/add-movement/add-movement.component';
import { SelectModule } from '../../core/components/select/select.module';
import { ProgressModule } from '../../core/components/progress/progress.module';
import { ThousandSuffixesModule } from '../../core/pipes/thousand-suffixes/thousand-suffixes.module';
import { MovementsListComponent } from './components/movements-list/movements-list.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    FinancesComponent,
    SummaryComponent,
    MovementsComponent,
    BudgetsComponent,
    AddMovementComponent,
    MovementsListComponent
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
  ]
})
export class FinancesModule { }
