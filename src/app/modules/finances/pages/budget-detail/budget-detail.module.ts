import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import {
  MovementListModule,
  MovementFormModule,
} from 'modules/finances/components';
import { ListItemModule, ProgressModule } from 'core/components';
import { ThousandSuffixesModule } from 'core/pipes';
import { BudgetDetailRoutingModule } from './budget-detail-routing.module';
import { BudgetDetailComponent } from './budget-detail.component';

@NgModule({
  declarations: [BudgetDetailComponent],
  imports: [
    CommonModule,
    BudgetDetailRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,

    MovementFormModule,
    ListItemModule,
    ProgressModule,
    ThousandSuffixesModule,
    MovementListModule,
  ],
})
export class BudgetDetailModule {}
