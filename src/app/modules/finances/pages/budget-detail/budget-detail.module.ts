import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetDetailRoutingModule } from './budget-detail-routing.module';
import { BudgetDetailComponent } from './budget-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MovementFormModule } from 'modules/finances/pages/movement-form/movement-form.module';
import { MovementItemModule } from 'modules/finances/components';
import { ProgressModule } from 'core/components/progress/progress.module';
import { ThousandSuffixesModule } from 'core/pipes/thousand-suffixes';

@NgModule({
  declarations: [BudgetDetailComponent],
  imports: [
    CommonModule,
    BudgetDetailRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,

    MovementFormModule,
    MovementItemModule,
    ProgressModule,
    ThousandSuffixesModule,
  ],
})
export class BudgetDetailModule {}
