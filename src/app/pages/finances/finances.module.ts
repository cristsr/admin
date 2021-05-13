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
import { ListModule } from '../../core/components/list/list.module';
import { ContainerModule } from '../../core/components/container/container.module';
import { IconModule } from '../../core/components/icon/icon.module';
import { LabelIconModule } from '../../core/components/label-icon/label-icon.module';
import { FlexModule } from '../../core/directives/flex/flex.module';
import { MovementModule } from '../../core/pipes/movement/movement.module';


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
    ListModule,
    ContainerModule,
    IconModule,
    LabelIconModule,
    FlexModule,
    MovementModule,
  ]
})
export class FinancesModule { }
