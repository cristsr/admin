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

@NgModule({
  declarations: [
    FinancesComponent,
    SummaryComponent,
    MovementsComponent,
    BudgetsComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule,
    TabsetModule,
    CardModule,
    ChartModule,
  ]
})
export class FinancesModule { }
