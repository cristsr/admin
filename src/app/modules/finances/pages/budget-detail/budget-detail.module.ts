import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { ListItemModule, ProgressModule } from 'core/components';
import { ThousandSuffixesModule } from 'core/pipes';
import {
  MovementListModule,
  MovementFormModule,
} from 'modules/finances/components';
import { GroupMovementModule } from 'modules/finances/pipes';
import { BudgetDetailComponent } from './budget-detail.component';
import { BudgetDetailRoutingModule } from './budget-detail-routing.module';

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
    GroupMovementModule,
  ],
})
export class BudgetDetailModule {}
