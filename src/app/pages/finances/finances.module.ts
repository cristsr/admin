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
import { IconModule } from '../../core/components/icon/icon.module';
import { LabelIconModule } from '../../core/components/label-icon/label-icon.module';
import { FlexModule } from '../../core/directives/flex/flex.module';
import { MovementModule } from '../../core/pipes/movement/movement.module';
import { AddMovementComponent } from './components/add-movement/add-movement.component';
import { SelectModule } from '../../core/components/select/select.module';
import { ProgressModule } from '../../core/components/progress/progress.module';
import { ThousandSuffixesModule } from '../../core/pipes/thousand-suffixes/thousand-suffixes.module';


@NgModule({
  declarations: [
    FinancesComponent,
    SummaryComponent,
    MovementsComponent,
    BudgetsComponent,
    AddMovementComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule,
    TabsetModule,
    CardModule,
    ChartModule,
    ListModule,
    IconModule,
    LabelIconModule,
    FlexModule,
    MovementModule,
    SelectModule,
    ProgressModule,
    ThousandSuffixesModule,
  ]
})
export class FinancesModule { }
