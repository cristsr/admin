import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesRoutingModule } from './finances-routing.module';
import { FinancesComponent } from './finances.component';
import { TabsetModule } from '../../core/components/tabset/tabset.module';
import { DirectivesModule } from '../../core/directives/directives.module';
import { CardModule } from '../../core/components/card/card.module';


@NgModule({
  declarations: [
    FinancesComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule,
    TabsetModule,
    DirectivesModule,
    CardModule
  ]
})
export class FinancesModule { }
